/**
 * Created by zelengzhuang on 4/5/15.
 */

angular.module('myApp').factory('aiService',
    ["alphaBetaService", "gameLogic",
function(alphaBetaService, gameLogic) {

    'use strict';

    function createComputerMove (board, playerStates, playerIndex, alphaBetaLimits) {
        return alphaBetaService.alphaBetaDecision(
            [null, {set: {key: 'board', value: board}}, {set: {key: 'playerStates', value: playerStates}}],
            playerIndex, getNextStates, getStateScoreForIndex0,
            // If you want to see debugging output in the console, then surf to game.html?debug
            window.location.search === '?debug' ? getDebugStateToString : null,
            alphaBetaLimits);
    }

    function getDebugStateToString(move) {
        return "\n" + move[1].set.value.join("\n") + "\n";
    }

    function getStateScoreForIndex0(move) {
        if (move[0].endMatch) {
            var endMatchScores = move[0].endMatch.endMatchScores;
            return endMatchScores[0] > endMatchScores[1] ? Number.POSITIVE_INFINITY
                : endMatchScores[0] < endMatchScores[1] ? Number.NEGATIVE_INFINITY
                : 0;
        }
        return 0;
    }


    function getNextStates(move, playerIndex) {
        return gameLogic.getAllPossibleMove (move[1].set.value, move[2].set.value, playerIndex);
    }






    return {createComputerMove: createComputerMove};
}]);