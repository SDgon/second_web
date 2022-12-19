// (finction () {})(); 아래와 같은 의미 함수
//전역 변수를 사용하지 않기 위함(지역 변수로)
(() => {

	let yOffset = 0; //window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는)씬(scroll-section)

	const sceneInfo = [ //정보를 담고 있는 배열 만듬, 객체 4개만듬(scrol section구간 4개이기 때문에)
		{	//0
			type: 'sticky',
			heightNum: 5,              	//브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,          //스크롤 각 구간에 정보를 담게 하기 위해서, 창 사이즈 변경에도 대응 해야해서 따로 함수로 처리함.
			objs: {
				container: document.querySelector('#scroll-section-0')
			}
		},
		{	//1
			type: 'normal',
			heightNum: 5, 
			scrollHeight: 0, 
			objs: {
				container: document.querySelector('#scroll-section-1')
			}       
		},
		{	//2
			type: 'sticky',
			heightNum: 5, 
			scrollHeight: 0, 
			objs: {
				container: document.querySelector('#scroll-section-2')
			}       
		},
		{	//3
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0, 
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
	}
	
	function scrollLoop() {
		prevScrollHeight = 0;
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}

		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			currentScene++;
			// document.body.setAttribute('id', `show-scene-section-${currentScene}`);
		}

		if (yOffset < prevScrollHeight) {
			if (currentScene === 0) return;  // 마우스 오버드래그로 씬 -되는거 방지차(모바일), 씬이 0되면 자동 리턴
			currentScene--; 
			// document.body.setAttribute('id', `show-scene-section-${currentScene}`);                                
		}
		
		document.body.setAttribute('id', `show-scene-section-${currentScene}`);	
	}
	
	window.addEventListener('resize', setLayout);
	window.addEventListener('scroll', () =>{
		yOffset = window.pageYOffset;
		scrollLoop();
	});

	setLayout();
})();