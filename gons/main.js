// (function() {}) ();  아래 함수와 같은 뜻

// (() => {  
// })();


(() => {  //함수 안에 작성(전역변수 피하기 위함(지역변수))  

    let yOffset = 0;  // window.pageYoffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0;  // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
    
    
    const sceneInfo = [
        
        {   //0
            type: 'sticky',
            heightNum: 5,  //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0, //창 사이즈 변경 대응해야해서 0값주고 따로 함수 처리
            objs: {  //html dom객체 요소들 
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-massage.a'),  //에니메이션 조작할 css들 가져옴
                messageB: document.querySelector('#scroll-section-0 .main-massage.b'),
                messageC: document.querySelector('#scroll-section-0 .main-massage.c'),
                messageD: document.querySelector('#scroll-section-0 .main-massage.d')
            },
            values: {
                messageA_opacity: [0, 1]
            }
        },
        {   //1
            type: 'normal',
            heightNum: 5,  //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0, //창 사이즈 변경 대응해야해서 0값주고 따로 함수 처리
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {   //2
            type: 'sticky',
            heightNum: 5,  //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0, //창 사이즈 변경 대응해야해서 0값주고 따로 함수 처리
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {   //3
            type: 'sticky',
            heightNum: 5,  //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0, //창 사이즈 변경 대응해야해서 0값주고 따로 함수 처리
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;  //각 신의 scrollHeight를 더해서 넣어주고있음
            if (totalScrollHeight >= yOffset) {  //토탈스크롤에 들어가는 값이랑 현재y스크롤 위치를 비교해서 더 커지면
                currentScene = i;  //현재 i를 세팅하고 
                break;  //for문을 멈추고 빠져나옴
            } 
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {  
        let rv;
        //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        
        rv = scrollRatio * (values[1] - values[0]) + values[0];
        
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        
        switch (currentScene) {
                case 0:
                    // console.log('0 play');
                    let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                    objs.messageA.style.opacity = messageA_opacity_in;
                    break;


                case 1:
                    // console.log('1 play');
                    break;
                case 2:
                    // console.log('2 play');
                    break;
                case 3:
                    // console.log('3 play');
                    break;
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for ( let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);  //변수랑 문자열 섞여 있으니까 (``백틱 사용)

        }   
        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return;  //0이면 리턴 보낸다는 뜻으로 스트롤 위쪽으로 -되는거 방지(모바일에서)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);  //변수랑 문자열 섞여 있으니까 (``백틱 사용)

        } 

        playAnimation();
    }

    
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
        
    });
    // window.addEventListener('DOMContentLoaded', setLayout);  //DOMContentLoaded가 load보다 실행 시점이 빠르나 이미지 및 영상 출력 전에 HTML실행
    window.addEventListener('load', setLayout);  //load 되면 setLayout을 실행하는걸로
    window.addEventListener('resize', setLayout);  //윈도우 창의 사이즈에따라 setLayout대응

    

 

})();
