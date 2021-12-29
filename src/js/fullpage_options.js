document.addEventListener('DOMContentLoaded', ()=>{
    $('#fullpage').fullpage({
        menu: '#menu',
        lockAnchors: false,
        // anchors:['main', 'info', 'services','news','distribution', 'contact'],
        navigation: false,
        navigationTooltips: ['main', 'info' ,'services', 'news', 'distribution', 'contact'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Скроллинг
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        // normalScrollElements: '#info, #services ,#news , #distribution',
        scrollOverflow: true,
        scrollOverflowReset: true,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        fixedElements: '.section_menu',
        //Доступ

        //Дизайн


        // parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        onLeave: function (index, nextIndex) {
            var leavingSection = $(this);
            if(nextIndex.item.classList.contains('light')){
                document.body.classList.add('light_section');
                if(nextIndex.item.dataset.bg != undefined){
                    header.style.background = '#'+ nextIndex.item.dataset.bg;
                }else{
                    header.style.background = ''
                }
            }else{
                document.body.classList.remove('light_section');
                header.style.background = '';
            }

            if(nextIndex.item.classList.contains('news')){

            }
        }
    })
})