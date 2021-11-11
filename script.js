window.addEventListener("load" , function (){

    //canvas取得
    const canvas        = document.querySelector('#canvas');
    const ctx           = canvas.getContext('2d');


    // 読み込み時コントローラ2個を追加する。
    function control_add() {

        let init            = $("#init_control").clone();
        let control_area    = $("#control_area");

        init.removeAttr("id")
        control_area.append(init);
    }
    control_add();
    control_add();


    //描画の流れ
    //◆垂直方向の処理
    //1,上から順にコントローラを参照する。傾き1で初期値0の切片を2ずつずらした一次関数を描画(この時、線の本数と太さにより描画できるX座標の領域が決まる)
    //2,次のコントローラを参照する。1で描画した右隣に1と同様に描画していく
    //3,全てのコントローラを参照し、描画し終えたら、今度は下のコントローラから上に向かって描画していく。(つまり、コントローラを1,2,3,4と描画した後、4,3,2,1と描画していく。これを繰り返す。)

    //◆水平方向の処理
    //1,上から順にコントローラを参照する。傾き1で初期値1の切片を2ずつずらした一次関数を描画(この時、線の本数と太さにより描画できるY座標の領域が決まる)
    //2,次のコントローラを参照する。1で描画した下に1と同様に描画していく
    //3,全てのコントローラを参照し、描画し終えたら、今度は下のコントローラから上に向かって描画していく。(つまり、コントローラを1,2,3,4と描画した後、4,3,2,1と描画していく。これを繰り返す。)

    
    //垂直方向への平行四辺形の描画
    function draw_para_vertical(color,x_start,x_end,b,size){

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle   = color;

        //一次関数(y=1x+b)で平行四辺形を描画
        ctx.moveTo(x_start, x_start+b );
        ctx.lineTo(x_end, x_end+b );
        ctx.lineTo(x_end, x_end+b+size );
        ctx.lineTo(x_start, x_start+b+size );
        
        ctx.fill();
        ctx.closePath();
    }

    //水平方向への平行四辺形の描画
    function draw_para_horizontal(color,y_start,y_end,b,size){

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle   = color;

        //一次関数(y=1x+b)で平行四辺形を描画
        ctx.moveTo( y_start-b       ,y_start);
        ctx.lineTo( y_end-b         ,y_end);
        ctx.lineTo( y_end-b+size    ,y_end);
        ctx.lineTo( y_start-b+size  ,y_start);

        ctx.fill();
        ctx.closePath();
    }

    //描画開始
    function draw(){
        //canvasの全領域を初期化してから描画開始
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //コントローラを全て取得、ループで順次描画させる
        let controls    = document.querySelectorAll("#control_area > .control");
        let size        = Number($("[name='size']").val());

        //色と本数の配列を作る
        let colors      = [];
        let numbers     = [];
        
        //コントローラの上から順に追加していく。
        for (let control of controls){
            //色と本数を取得し、配列へ追加していく
            colors.push($(control).find("[name='color']").val());
            numbers.push($(control).find("[name='number']").val());
        }
        let length      = colors.length;

        let x_start     = 0;
        let x_end       = 0;

        //垂直方向に描画するループ
        while (x_start < 300){

            for (let i=0;i<length;i++){
                //ここで描画
                //線の太さを考慮して描画する領域を決定
                let b   = -300;
                x_end   = x_start + numbers[i]*2*size;

                while (b < 600){
                    //平行四辺形を描画する。←ただの線だと表現できない
                    draw_para_vertical(colors[i],x_start,x_end,b,size)
                    b = b + size*2;
                }
                x_start   = x_end;
            }
            //色と本数を逆順にして描画
            colors.reverse();
            numbers.reverse();
        }
        
        //水平方向に描画するループ

        let y_start     = 0;
        let y_end       = 0;

        while (y_start < 300){

            for (let i=0;i<length;i++){
                //ここで描画
                //線の太さを考慮して描画する領域を決定
                let b   = -300;
                y_end   = y_start + numbers[i]*2*size;

                while (b < 600){
                    //平行四辺形を描画する。←ただの線だと表現できない
                    draw_para_horizontal(colors[i],y_start,y_end,b,size)
                    b = b + size*2;
                }
                y_start   = y_end;
            }
            //色と本数を逆順にして描画
            colors.reverse();
            numbers.reverse();
        }
    }

    draw();

    $(document).on("input", "[name='color']"    ,function() { draw(); });
    $(document).on("input", "[name='number']"   ,function() { draw(); });
    $(document).on("input", "[name='size']"     ,function() { draw(); });

    $("#control_add").on("click",function() { control_add();draw(); });

});

