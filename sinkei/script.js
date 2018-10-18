window.onload = function(){
    var MIN = 0; // カード最小値
    var MAX = 0; // カード最大値(0スタート) 必ず奇数で指定
    var CARD = 0; // カードの必要枚数
    var cnt = 0; // めくれたカードカウント用
    var str = ''; // 図柄はランダムで決定
    var cStr = []; // カードの絵柄となる文字列を配列で格納
    var judgeCnt = 0; // 正解数
    var img = []; // 図柄が何回出てきたかのカウント img[0, 0]
    var tCard = []; // めくられたカード図柄一時格納
    var aCnt = 0; // 正解までの手数
    var sCnt = 0; // 正解数
    var tags = []; // tdエレメント格納用
    var wrap = bid('wrap'); // wrapの中にappendChildする為

    // initialize
    var seikai = bid('seikai');
    var st = bid('start');
    var re = bid('reset');
    var select = bid('select');
    re.disabled = true;
    ael(st, 'click', generate);
    ael(re, 'click', reset);
    select.addEventListener('change', deleted);
    var table = document.createElement('table');
    wrap.appendChild(table);
    table.id = 'table';
    table = bid('table');

    // マス目生成
    function generate(){
        // generate前に初期化
        initialize();
        
        // ボタンの状態・マスの最大値をとりつつtableを生成
        re.disabled = false;
        MAX = parseInt(select.value) - 1;
        CARD = (MAX + 1) * (MAX + 1) / 2;

        // ランダムな文字列生成
        cStr = [];// 配列[] = 何もない状態 push →　配列[0], push →　配列[0,0]
        str = '★◆◇■☆！？＠§ΘΣΩΨβ※∞√∬♯♪㍽㍼';
        for(var i = 0; i < CARD; i++){
            var rnd = Math.floor(Math.random() * str.length);
            cStr.push(str[rnd]);
            str = str.replace(str[rnd], ''); // 一度使用した文字列は使わない為replaceで削除
        }
        for(var i = 0; i < cStr.length; i++){
            img.push(0);
        }

        // tableの行と列を生成しつつ中身生成とイベント登録
        for(var r = 0; r <= MAX; r++){
            var tr = document.createElement('tr');
            table.appendChild(tr);
            for(var c = 0; c <= MAX; c++){
                var td = document.createElement('td');
                tr.appendChild(td);
                td.id = r + '-' + c;

                tags.push(bid(r + "-" + c));
                while(true){
                    var m = Math.floor(Math.random() * CARD);
                    if(img[m] < 2){
                        tags[tags.length - 1].innerHTML = cStr[m];
                        img[m]++;
                        break;
                    }
                }
                ael(tags[tags.length - 1], 'click', turn);
            }
        }
        st.disabled = true;
    }
    // カードをめくるイベント
    function turn(eve){
        var elm = eve.currentTarget;
            if(elm.style.color != 'black'){
                elm.style.color = 'black';
                setTimeout(function(){
                    judge(elm)
                }, 100);
            }
    }
    // カードがめくられた時のイベント
    // カードをめくった枚数の2の余剰が0ならめくったカードが一緒か調べる
    function judge(elm){
        tCard.push(elm);
        cnt++;
        if(cnt % 2 == 0){
            if(tCard[0].innerHTML !== tCard[1].innerHTML){
                setTimeout(function(){
                    tCard[0].style.color = 'green';
                    tCard[1].style.color = 'green';
                    tCard = [];
                    aCnt++;
                    tekazu.innerHTML = aCnt;
                }, 300);
            }else{
                judgeCnt++;
                if(judgeCnt != CARD){
                    tCard = [];
                    aCnt++;
                    sCnt++;
                    setTimeout(function(){
                        tekazu.innerHTML = aCnt;
                        seikai.innerHTML = sCnt;
                    }, 50);
                }else{
                    tCard = [];
                    alert('全て揃いました');
                    aCnt++;
                    sCnt++;
                    tekazu.innerHTML = aCnt;
                    seikai.innerHTML = sCnt;
                    setTimeout(function(){
                        if(aCnt !== sCnt){
                            alert('全部揃うまでの手数' + aCnt + '回');
                        }else{
                            alert('パーフェクト！');
                        }
                        reset();
                    }, 500);
                }
            }
        }
    }
    function reset(){
        tekazu.innerHTML = 0;
        seikai.innerHTML = 0;
        st.disabled = true;
        re.disabled = true;
        initialize();
        for(var i = 0; i < tags.length; i++){
            if(tags[i].style.color != 'green'){
                tags[i].style.color = 'green';
            }
        }
        deleted();
    }
    function deleted(){
        st.disabled = false;
        re.disabled = true;
        initialize();
        if(table.rows.length > 0){
            for(var i = 0; i <= MAX; i++){
                table.deleteRow(0);
            }
        }
    }
    function initialize(){
        cnt = 0;
        tCard = [];
        img = [];
        tekazu.innerHTML = 0;
        seikai.innerHTML = 0;
        aCnt = 0;
        sCnt = 0;
        cnt = 0;
        judgeCnt = 0;
    }
}
function bid(id){
    return document.getElementById(id);
}
function ael(elm, type, func){
    elm.addEventListener(type, func);
}