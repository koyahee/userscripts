// ==UserScript==
// @name         添付文書検索
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  添付文書検索ページの改造
// @author       koyahee
// @match        http*://www.pmda.go.jp/PmdaSearch/iyakuSearch/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function(){
        //console.log("UserScript test");


        //不要な部分を非表示に

        //ヘッダ
        document.getElementById('HeaderPopArea').style = 'display:none;';
        document.getElementById('SearchHd').style = 'display:none;';

        //フォーム全体を非表示
        document.getElementById('SearchWrap01').style = 'visibility:hidden; height:0;';

        //下の検索ボタン
        document.getElementsByClassName('SearchBlock01')[1].style.display = 'none';

        if(document.getElementsByName('koumoku1Word')[0].value != "") {
            document.getElementsByName('nameWord')[0].value = document.getElementsByName('koumoku1Word')[0].value;
        }

        //検索ボックスの位置調整
        document.getElementsByName('nameWord')[0].style="visibility:visible; position:relative; top:-220px; left:-15px; width:230px;";

        //alert("UserScriptが有効です。")
//        alert(document.getElementsByName('nameWord')[0].value);

        document.getElementsByName('iyakuSearchActionForm')[0].onsubmit = function() {

            var nameWord = document.getElementsByName('nameWord')[0].value;

            if(isYJCode(nameWord)) {
                document.getElementsByName('koumoku1Value')[0].value="allsearch";
                document.getElementsByName('koumoku1Word')[0].value=nameWord;
                document.getElementsByName('nameWord')[0].value = ""
            } else {

            }
        }


    }
    var isYJCode = function (param) {
        var isYJ = true;

        //英数字以外が含まれる
        var re = new RegExp(/[0-9]|[A-Z]/g);
        if (param.replace(re,"").length > 0) {
            //		alert("英数字以外が含まれる");
            isYJ = false
        }

        //2文字より多くの英字が含まれる
        re = new RegExp(/[A-Z]/g);
        if (param.length - param.replace(re, "").length > 2) {
            //		alert("2文字より多くの英字が含まれる");
            isYJ = false
        }

        //一文字目が数字ではない
        re = new RegExp(/[^\d]/);
        if (param.substring(1,1).match(re)) {
            //		alert("一文字目が数字ではない");
            isYJ = false
        }

        return isYJ;
    }

})();
