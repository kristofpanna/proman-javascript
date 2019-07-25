// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
        statuses: ['new', 'in progress', 'testing', 'done'],
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
        makeBoard: function (board) {
            // board header
            let boardHtml = `
                <section class="board" data-boardid="${board.id}">
                    <div class="board-header"><span class="board-title" data-boardid="${board.id}">${board.title}</span>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                        <a class="board-delete" href="/delete-board/${board.id}">
                            <input class="board-toggle" type="submit" value="Delete"/>
                        </a>                 
                    </div>
                    <div class="board-columns">`;
            // columns
            for (let status of dom.statuses) {
                boardHtml += `<div class="board-column" data-status="${status}">
                <div class="board-column-title">${status}</div>
                <div class="board-column-content"></div>
            </div>`;
            }
            // board end
            boardHtml +=
                `    </div>
             </section>`;
            return boardHtml;
        },
        showBoards: function (boards) {
            // shows boards appending them to #boards div
            // it adds necessary event listeners also

            let boardList = '';

            for (let board of boards) {
                boardList += dom.makeBoard(board);
            }

            const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>
        `;

            this._appendToElement(document.querySelector('body'), outerHtml);

            for (let board of boards) {
                dom.loadCards(board.id);
            }
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
                let data = {
                    'board_id': textarea.querySelector('.id').value,
                    'title': textarea.querySelector('.new-title').value
                }
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
        sendData: function (data) {
            let XHR = new XMLHttpRequest();
            let jsonData = JSON.stringify(data);

            XHR.addEventListener("error", function (event) {
                alert('Sorry, could not save this.');
            });
            XHR.open("POST", '/rename-board',);
            XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            XHR.send(jsonData);
        },
        loadCards: function (boardId) {
            // retrieves cards and makes showCards called
            dataHandler.getCardsByBoardId(boardId, function (cards) {
                dom.showCards(cards, boardId);
            });
        },
        showCards: function (cards, boardId) {
            // shows the cards of a board
            // it adds necessary event listeners also
            let board = document.querySelector(`[data-boardid="${boardId}"]`);
            for (let card of cards) {
                let statusText = card.status;
                let column = board.querySelector(`[data-status="${statusText}"]`);
                let columnContent = column.querySelector(`.board-column-content`);
                card = `<div class="card">
                        <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                        <div class="card-title">${card.title}</div>
                    </div>`;
                this._appendToElement(columnContent, card);
            }
        }
    };
