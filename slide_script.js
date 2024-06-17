    // 슬라이드 컨테이너와 슬라이드 요소들 선택
function createSlider(sliderId) {
    const sliderContainer = document.getElementById(sliderId);
    const slides = sliderContainer.querySelector('.slides'); // slides 변수 선언
    const slideCount = sliderContainer.querySelectorAll('.slide').length;  // 전체 슬라이드 개수
    const firstSlide = document.querySelectorAll('.slide')[1];     // 첫 번째 실제 슬라이드
    const lastSlide = document.querySelectorAll('.slide')[slideCount - 2]; // 마지막 실제 슬라이드
    let currentIndex = 1;  // 현재 슬라이드 인덱스 (첫 번째 실제 슬라이드)
    let isTransitioning = false; // 슬라이드 전환 중인지 여부

    // 슬라이드 이동 함수
    function goToSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        slides.style.transition = 'transform 0.5s ease-in-out';
    }

    // 다음 슬라이드로 이동하는 함수
    function nextSlide() {
        if (isTransitioning) return;  // 전환 중이면 함수 종료
        isTransitioning = true;  // 전환 상태로 설정

        currentIndex++;  // 인덱스 증가
        goToSlide(currentIndex);  // 슬라이드 이동

        // 마지막 슬라이드에 도달했을 때 처리
        if (currentIndex === slideCount - 1) {
            setTimeout(() => {
                slides.style.transition = 'none';  // 트랜지션 효과 제거
                currentIndex = 1;  // 인덱스를 첫 번째 슬라이드로 설정
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                slides.offsetHeight;  // 리플로우 강제
                slides.style.transition = 'transform 0.5s ease-in-out';  // 트랜지션 효과 복구
                isTransitioning = false;  // 전환 상태 해제
            }, 500);  // 0.5초 후에 실행
        } else {
            setTimeout(() => {
                isTransitioning = false;  // 전환 상태 해제
            }, 500);  // 0.5초 후에 실행
        }
    }

    // 일정 시간마다 nextSlide 함수 실행
    setInterval(nextSlide, 3000);  // 3초마다 실행

    // 슬라이드 전환이 끝났을 때 이벤트 핸들러
    slides.addEventListener('transitionend', () => {
        if (currentIndex === 0) {  // 첫 번째 슬라이드에서 복제된 슬라이드로 이동했을 때
            slides.style.transition = 'none';  // 트랜지션 효과 제거
            currentIndex = slideCount - 2;  // 인덱스를 마지막 실제 슬라이드로 설정
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.offsetHeight;  // 리플로우 강제
            slides.style.transition = 'transform 0.5s ease-in-out';  // 트랜지션 효과 복구
        }
    });
}
createSlider('slider_index');
createSlider('slider_tourism');
createSlider('slider_hrs');
createSlider('slider_event');

