// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            dom.hideLoadingText();
            dom.addRenameListeners();
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `
                <section class="board">
                    <div class="board-header"><span class="board-title" data-boardid="${board.id}">${board.title}</span>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div class="board-columns">
                        
                    </div>
                </section>
            `;
        }

        const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>
        `;

        this._appendToElement(document.querySelector('body'), outerHtml);
    },
    hideLoadingText: function () {
        let loadingElement = document.querySelector('#boards');
        loadingElement.remove();
    },
    addRenameListeners: function () {
        let titleElements = document.querySelectorAll('.board-title');
        for (let titleElement of titleElements) {
            titleElement.addEventListener('click', dom.renameHandler);
        }
    },
    renameHandler: function (event) {
        let titleField = event.currentTarget;
        let title = titleField.textContent;
        titleField.textContent = '';
        let boardId = titleField.dataset.boardid;
        let renameForm = dom.createForm(boardId, title);
        titleField.appendChild(renameForm);
        titleField.removeEventListener('click', dom.renameHandler);
        let form = titleField.querySelector("#rename");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let textarea = event.target;
            let data = {'board_id': textarea.querySelector('.id').value, 'title' : textarea.querySelector('.new-title').value}
            dom.sendData(data);
            let input = textarea.querySelector('.new-title');
            let newTitle = input.value;
            textarea.outerHTML = newTitle;
        });

    },
    createForm: function (id, defaultText) {
        let renameTemplate = document.getElementById('rename-template');
        const renameForm = document.importNode(renameTemplate.content, true);
        let input = renameForm.querySelector('.new-title');
        let hiddenInput = renameForm.querySelector('.id');
        hiddenInput.setAttribute('value', id);
        input.setAttribute('value', defaultText);
        return renameForm;
    },
    /*saveRename: function (event) {
        event.preventDefault();
        let form = event.target;
        dom.sendData(form);
    },*/
    sendData: function (data) {
        let XHR = new XMLHttpRequest();
        let jsonData = JSON.stringify(data);
        XHR.addEventListener("load", function (event) {
            alert(jsonData);
        });
        XHR.addEventListener("error", function (event) {
            alert('Sorry, could not save this.');
        });
        XHR.open("POST", '/rename-board', );
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        XHR.send(jsonData);
    },

loadCards: function (boardId) {
    // retrieves cards and makes showCards called
},
showCards: function (cards) {
    // shows the cards of a board
    // it adds necessary event listeners also
}
// here comes more features
}
;
