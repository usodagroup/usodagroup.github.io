// DOM(HTML)이 모두 로드된 후에 이 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', function() {

    // 1. Swiper 슬라이더를 초기화(실행)합니다.
    const swiper = new Swiper('.mySwiper', {
        // 옵션: 반복 재생
        loop: true, 
        
        // 옵션: 자동 재생 (3초마다)
        autoplay: {
            delay: 3000,
            disableOnInteraction: false, // 사용자가 만져도 계속 자동재생
        },

        // 옵션: 페이지네이션 (아래 점...)
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 2. (핵심) 사진 목록 파일을 읽어와서 슬라이더를 채웁니다.
    // '방법 2: JSON 파일 관리' 방식입니다.
    loadGalleryImages(); 
});


/**
 * gallery.json 파일을 읽어와서 Swiper 슬라이드 항목을 동적으로 생성합니다.
 */
function loadGalleryImages() {
    // 1. JSON 파일 경로. (5단계에서 만들 파일입니다)
    const jsonPath = 'gallery.json'; 

    // 2. fetch API로 JSON 파일을 비동기로 가져옵니다.
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('gallery.json 파일을 불러올 수 없습니다.');
            }
            return response.json();
        })
        .then(data => {
            // 3. JSON 데이터(data)에서 이미지 목록(images)을 가져옵니다.
            const images = data.images;
            const swiperWrapper = document.querySelector('.swiper-wrapper');

            if (images && images.length > 0) {
                // 4. 이미지 목록을 순회하면서 HTML(슬라이드)을 생성합니다.
                const slidesHTML = images.map(imageName => {
                    return `
                        <div class="swiper-slide">
                            <img src="images/${imageName}" alt="대표사진">
                        </div>
                    `;
                }).join(''); // 배열을 하나의 긴 문자열로 합칩니다.

                // 5. 생성된 HTML을 swiper-wrapper 내부에 삽입합니다.
                swiperWrapper.innerHTML = slidesHTML;
                
                // 6. (중요) 슬라이드가 동적으로 추가되었으므로 Swiper를 업데이트합니다.
                const swiperInstance = document.querySelector('.mySwiper').swiper;
                swiperInstance.update();

            } else {
                // 이미지가 없을 경우
                swiperWrapper.innerHTML = '<div class="swiper-slide">표시할 이미지가 없습니다.</div>';
            }
        })
        .catch(error => {
            // 파일을 읽다가 에러가 난 경우
            console.error('갤러리 로딩 오류:', error);
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            swiperWrapper.innerHTML = '<div class="swiper-slide">사진을 불러오는 데 실패했습니다.</div>';
        });
}