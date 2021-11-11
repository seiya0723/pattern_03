window.addEventListener("load" , function (){

    const canvas        = document.querySelector('#canvas');
    const ctx           = canvas.getContext('2d');



    //実線の模様の場合、実線のピクセルは考慮しないで座標を指定してもよい。実線の中心から左右に幅が広がっていく。
    /*
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth   = 40;

    //一次関数(y=1x+b)で平行四辺形を描画
    ctx.moveTo(20,0);
    ctx.lineTo(20,300);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth   = 40;

    //一次関数(y=1x+b)で平行四辺形を描画
    ctx.moveTo(60,0);
    ctx.lineTo(60,300);
    ctx.stroke();
    ctx.closePath();
    */


    //実線を描画し、その中を塗りつぶす場合。実線も描画するのであれば、実線のピクセルを考慮して座標を指定しなければならない。
    /*
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle   = "#0000FF";
    ctx.lineWidth   = 1;

    ctx.moveTo(1,1);
    ctx.lineTo(1,299);
    ctx.lineTo(41,299);
    ctx.lineTo(41,1);
    ctx.lineTo(1,1);

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    */

    //実線の中を塗りつぶす場合、実線を描画しないのであれば、実線のピクセルは無視して計算する(実線をそのまま描画する場合と同様)
    /*
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle   = "#0000FF";
    ctx.lineWidth   = 1;

    ctx.moveTo(0,0);
    ctx.lineTo(0,300);
    ctx.lineTo(40,300);
    ctx.lineTo(40,0);

    //ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle   = "#0000FF";
    ctx.lineWidth   = 1;

    ctx.moveTo(40,0);
    ctx.lineTo(40,300);
    ctx.lineTo(80,300);
    ctx.lineTo(80,0);

    //ctx.stroke();
    ctx.fill();
    ctx.closePath();
    */



    //縞模様を書く時、ctx.globalAlphaを使ったり、ctx.stroke()で線を描画してはならない
    
    //線のサイズは40
    /*
    let size    = 6;
    let counter = 0;
    for (let x=0;x<300;x+=size){

        ctx.beginPath();
        ctx.fillStyle   = "#0000FF";

        console.log(counter%2);


        if (counter%2 == 0){
            counter++;
            continue;
        }
        counter++;

        ctx.lineWidth   = 1;

        ctx.moveTo(x,0);
        ctx.lineTo(x,300);
        ctx.lineTo(x+size,300);
        ctx.lineTo(x+size,0);

        ctx.fill();
        ctx.closePath();
    }
    */


    //互い違いに斜めの縞模様を書く時
    
    //Y=ax+bの一次関数
    /*
    function linear(x,b){
        return x+b
    }

    let size    = 10;
    let counter = 0;
    let x_start = 0;
    let x_end   = 300;

    for (let b=-300;b<600;b+=size){
        ctx.beginPath();

        ctx.fillStyle   = "#0000FF";

        //縞模様にする
        if (counter%2 == 0){
            counter++;
            continue;
        }
        counter++;

        ctx.lineWidth   = 1;

        ctx.moveTo( x_start , linear(x_start,b)      );
        ctx.lineTo( x_end   , linear(x_end  ,b)      );
        ctx.lineTo( x_end   , linear(x_end  ,b+size) );
        ctx.lineTo( x_start , linear(x_start,b+size) );

        ctx.fill();
        ctx.closePath();
    }
    for (let b=-300;b<600;b+=size){
        ctx.beginPath();

        ctx.fillStyle   = "#00FF00";

        //縞模様にする
        if (counter%2 == 1){
            counter++;
            continue;
        }
        counter++;

        ctx.lineWidth   = 1;

        ctx.moveTo( x_start , linear(x_start,b)      );
        ctx.lineTo( x_end   , linear(x_end  ,b)      );
        ctx.lineTo( x_end   , linear(x_end  ,b+size) );
        ctx.lineTo( x_start , linear(x_start,b+size) );

        ctx.fill();
        ctx.closePath();
    }
    */


    /*

    //タータンチェックのX軸方向のみ

    //Y=ax+bの一次関数
    function linear(x,b){
        return x+b
    }

    let width   = 50;

    let size    = 10;
    let counter = 0;

    color_list  = [ "#0000FF","#00FF00" ]

    let x_start = 0;
    let x_end   = 0;

    while (x_start<300){

        for (let color of color_list){
            x_end   = x_end + width;
        
            for (let b=-300;b<600;b+=size){
                ctx.beginPath();

                ctx.fillStyle   = color;

                //縞模様にする
                if (counter%2 == 0){
                    counter++;
                    continue;
                }
                counter++;

                ctx.lineWidth   = 1;

                ctx.moveTo( x_start , linear(x_start,b)      );
                ctx.lineTo( x_end   , linear(x_end  ,b)      );
                ctx.lineTo( x_end   , linear(x_end  ,b+size) );
                ctx.lineTo( x_start , linear(x_start,b+size) );

                ctx.fill();
                ctx.closePath();
            }
            x_start = x_end;
        }

        color_list.reverse();
    }

    */


    //タータンチェック(X軸方向とY軸方向のクロス)
    //XXX:X軸方向とY軸方向にクロスする場所で描画されていない箇所の白線が目立つ。
    
    //Y=ax+bの一次関数
    function linearX(x,b){
        return x+b
    }
    function linearY(y,b){
        return y-b
    }

    let size        = 10;
    let counter     = 0;
    let color_list  = [ "#0000FF","#00FF00" ];


    //垂直方向のタータンチェック

    let width   = 50;
    let x_start = 0;
    let x_end   = 0;

    while (x_start<300){

        for (let color of color_list){
            x_end   = x_end + width;
        
            for (let b=-300;b<600;b+=size){
                ctx.beginPath();

                ctx.fillStyle   = color;

                //縞模様にする
                if (counter%2 == 0){
                    counter++;
                    continue;
                }
                counter++;

                ctx.lineWidth   = 1;

                ctx.moveTo( x_start , linearX(x_start,b)      );
                ctx.lineTo( x_end   , linearX(x_end  ,b)      );
                ctx.lineTo( x_end   , linearX(x_end  ,b+size) );
                ctx.lineTo( x_start , linearX(x_start,b+size) );

                ctx.fill();
                ctx.closePath();
            }
            x_start = x_end;
        }

        color_list.reverse();
    }

    //水平方向のタータンチェック

    let height  = 50;
    let y_start = 0;
    let y_end   = 0;

    while (y_start<300){

        for (let color of color_list){
            y_end   = y_end + height;
        
            for (let b=-300;b<600;b+=size){
                ctx.beginPath();

                ctx.fillStyle   = color;

                //縞模様にする
                if (counter%2 == 1){
                    counter++;
                    continue;
                }
                counter++;

                ctx.lineWidth   = 1;

                ctx.moveTo( linearY(y_start,b) ,y_start  );
                ctx.lineTo( linearY(y_end  ,b) ,y_end    );
                ctx.lineTo( linearY(y_end  ,b+size) ,y_end    );
                ctx.lineTo( linearY(y_start,b+size) ,y_start  );

                ctx.fill();
                ctx.closePath();
            }

            y_start = y_end;
        }

        color_list.reverse();
    }


});

