document.addEventListener('DOMContentLoaded', ()=>{
    let header = document.querySelector('header')
    let light_logo = document.querySelector('.logo_light'),
        dark_logo = document.querySelector('.logo_dark');
    //Всплытие блока в зависимоти от места нажатия
    const popup = document.querySelector('.popup'),
        linkHoverLocation = document.querySelector('.link_hover_location'),
        linkHoverSingIn = document.querySelector('.link_hover_sing_in'),
        contentPopup = document.querySelector('.content_popup'),
        closeBtn = document.querySelector('.btn_close');

    //Кнопка вызывает вункцию закрытия popup и вложенного конента
    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        disablePopup('form');
        disablePopup('map')
    })
    //При клике чистим классы, затем получаем координаты кнопки по которой нажали и открываем popup
    //Надо вынести в функцию !!!
    linkHoverSingIn.addEventListener('click', (e)=>{
        disablePopup('form')
        e.preventDefault();
        popup.classList.add('popup_active');
        document.body.classList.add('active_pop')
        popup.style.left = linkHoverSingIn.getBoundingClientRect().x + 60  + 'px';
        popup.style.top = linkHoverSingIn.getBoundingClientRect().y + 'px';
        showContentPopup('.form')
        console.log('form')
        }
    )

    linkHoverLocation.addEventListener('click', (e)=>{
        disablePopup('map')
        e.preventDefault();
        cur.map && cur.map();
        popup.classList.add('popup_active');
        document.body.classList.add('active_pop')
        popup.style.left = linkHoverLocation.getBoundingClientRect().x + 80  + 'px'
        popup.style.top = linkHoverLocation.getBoundingClientRect().y + 'px'
        showContentPopup('.map')

    })
    //*-------------------------*
    //Функция показывает контент popup в зависимости от кнопки по которой нажали
    function showContentPopup(className) {
        contentPopup.style.opacity = '1';
        contentPopup.style.zIndex = '65';
        if(contentPopup.querySelector(className)){
           let el = contentPopup.querySelector(className);
           el.style.display = 'flex'
        }
        
    }

    //Функция закрывает все popup, чистит классы
    function disablePopup(content) {
        popup.classList.remove('popup_active');
        contentPopup.style.zIndex = '-1';
        document.body.classList.remove('active_pop');
        contentPopup.style.opacity = '0';
        let map = document.querySelector('.map'),
            form = document.querySelector('.form');
        if(content == 'map'){
            form.style.display = 'none';
            map.style.display = 'block';
        }else{
            form.style.display = 'block';
            map.style.display = 'none';
        }
    }
    //
    //

    //-------------------


    //-------------------

    //Функционлал меню
    const mainMenu = document.querySelector('.main_menu'),
        liEl = mainMenu.querySelectorAll('li'),
        linkEl = mainMenu.querySelectorAll('a'),
        subMenu = document.querySelector('.sub_menu_list'),
        bgBlur = document.querySelector('.bg_blur');

    //Скрытие пустого меню
    subMenu.style.left = '-200%';
    //Слушатель события наведения мыши и если есть в пункте подменю то берем его
    //и суем в всплывающее меню, так же инициализируем там слушатели события
    //наведения мыши и делаем листающеся меню с подпунктами

    liEl.forEach((item,id)=>{
        item.addEventListener('mouseover', (e)=>{
            clearClassActive(liEl, 'active')
            item.classList.add('active')
            if(document.body.classList.contains('light_section')){
                header.classList.add('transpar')
            }
            if(item.querySelector('.menu_el_main')){
                let el = item.querySelector('.menu_el_main')
                subMenu.innerHTML = el.outerHTML;
                subMenu.style.left = '0%';
                document.body.classList.add('active_poup');
                addlistenerForSubMenu()
                if(document.body.classList.contains('light_section')){
                    header.classList.add('transpar')
                }

            }else{
                subMenu.style.left = '-200%'
                document.body.classList.remove('active_poup');
                console.log('else Block')
                header.classList.remove('transpar')

            }
        })
    })
    //Функция вешает события на элементы меню
    function addlistenerForSubMenu() {

        let subMenuEl = subMenu.querySelectorAll('.list_link');
        //Получение позции первого элемента
        let posFirstEl = subMenuEl[0].getBoundingClientRect().y;
        subMenuEl.forEach(item=>{
            item.addEventListener('mouseover', ()=>{
                clearClassActive(subMenuEl, 'active_el', true)
                item.classList.add('active_el')
                //Получение позции активного элемента
                let posEl = item.getBoundingClientRect().y;
                //Расчет разницы между элементами и присвоение к выпадающему списку для выравнивания выпадающего списка, относительно основного списка
                let topPosition = posFirstEl - posEl;
                if(item.firstElementChild != null && !item.parentNode.parentNode.classList.contains('contact')){
                   let el = item.firstElementChild;
                   el.style.top = `${topPosition - 15}px`;

                }
            })
        })
    }
    //Функция для очистки классов активности, если третий параметр передам то
    //функция начинает работать в всплывающем меню
    function clearClassActive(element,className , subMenu = false,) {
        for(let i = 0; i < element.length; i++){
            element[i].classList.remove(className);
            if(subMenu = true){
                element[i].classList.remove(className);
            }
        }
    }
    //При наведении на блюренный фон скрывать меню
    bgBlur.addEventListener('mouseover', ()=>{
        subMenu.style.left = '-200%'
        document.body.classList.remove('active_poup');
        header.classList.remove('transpar')
    })



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
                // if(nextIndex.item.dataset.bg != undefined){
                //     header.style.background = nextIndex.item.dataset.bg;
                // }else{
                //     header.style.background = ''
                // }
            }else{
                document.body.classList.remove('light_section');
                header.style.background = '';


            }

            if(nextIndex.item.classList.contains('news')){

            }
        }
    })

    let all_sections = document.querySelectorAll('.fp-section');

    if(all_sections[0].classList.contains('light')){
        document.body.classList.add('light_section');
        if(all_sections[0].dataset.bg != undefined){
            header.style.background =  all_sections[0].dataset.bg;
        }
    }




    //

    let btnToggleNextSection = document.querySelector('.toggle_btn_next');
    let sections = document.querySelectorAll('.fp-section');
    if(btnToggleNextSection != null){
        btnToggleNextSection.addEventListener('click', (e)=>{
            e.preventDefault();
            fullpage_api.moveSectionDown();
        })
    }


    //_____________Функционад fullpage.js
    //_____________
    const nextBtn = document.querySelector('.fp-next')
    function nextSlide() {
        fullpage_api.moveSlideRight()
    }
    if(nextBtn != null){
        nextBtn.addEventListener('click', ()=>{
            clearInterval(autoplaySlide);
            nextSlide()
            checkCurrentSlide();
            setTimeout(autoplaySlide , 5000)
        })
    }


    let autoplaySlide =  setInterval(()=>{
        nextSlide()
        checkCurrentSlide()
    },9900)
    //Вывод номера активного слайда
    let currentCount = document.querySelector('.current_count'),
        fullCount = document.querySelector('.full_count'),
        listSlide = document.querySelectorAll('.slide_main');

    console.log(listSlide)

    function checkCurrentSlide() {
        if(listSlide.length > 0){
            fullCount.textContent = listSlide.length;
            if(listSlide.length < 10){
                fullCount.textContent = '0' + listSlide.length;
            }
            for(let i = 0; i < listSlide.length; i++){
                if(listSlide[i].classList.contains('active')){
                    i++
                    if(i < 10){
                        currentCount.textContent = `0${i}`
                    }else{
                        currentCount.textContent = `${i}`
                    }
                }
            }
        }

    }
    checkCurrentSlide()
    //Анимация loader

    const canvas = document.getElementById("canvas");
    if(canvas != null){
        const ctx = canvas.getContext("2d");
        const timer = {
            duration: 10000, // ms
            startTime: null,
            isRunning: false
        };
        const circle = {
            x:0,
            y:0,
            radius: 50,
            center: { x: canvas.width / 2, y: canvas.height / 2 }
        };

        const PI2 = Math.PI * 2;
        const PIHalf = Math.PI / 2;
        let progress = 0;

        function render(timestamp) {
            if (!timer.isRunning) {
                return;
            }

            if (!timer.startTime) {
                timer.startTime = timestamp;
            }

            const runtime = timestamp - timer.startTime;
            progress = runtime / timer.duration;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            draw(circle, progress);

            if (runtime < timer.duration) {
                requestAnimationFrame(render);
            } else {
                start();
            }
        }

        function draw(circle, progress) {
            const start = -PIHalf; // begin from top
            const end = PI2 * progress + start;
            ctx.beginPath();
            ctx.arc(circle.center.x, circle.center.y, circle.radius, start, end);
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.strokeStyle = "white";
            ctx.stroke();
        }

        function start() {
            timer.isRunning = true;

            progress = 0;
            timer.startTime = null;

            setTimeout(() => {
                requestAnimationFrame(render);
            }, 300);
        }
        function stop() {
            timer.isRunning = false;
        }

        start();
    }




//_____________ Табы на главной странице
    let tabBtns = document.querySelectorAll('.link_tab'),
        itemsTabs = document.querySelectorAll('.items_tabs');

    tabBtns.forEach((item,id)=>{
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            showTabs(id)

        })
    })

    function showTabs(id) {
        for(let i = 0; i < tabBtns.length; i++){
            tabBtns[i].classList.remove('active');
            itemsTabs[i].classList.remove('active')
            itemsTabs[id].classList.add('active');
            tabBtns[id].classList.add('active')
        }
    }
    showTabs(0)
//____________



})