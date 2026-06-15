document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       SECURITY UTILITY (XSS Prevention & Input Sanitization)
       ========================================================================== */
    const escapeHTML = (str) => {
        if (typeof str !== 'string') return str;
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    /* ==========================================================================
       NOTIFICATION UTILITY (Premium Toast System)
       ========================================================================== */
    const showNotification = (message, type = 'success') => {
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="toast-message">${escapeHTML(message)}</span>
        `;
        document.body.appendChild(toast);
        // Force reflow
        toast.offsetHeight;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    };

    /* ==========================================================================
       TRANSLATION DICTIONARY (i18n)
       ========================================================================== */
    const translations = {
        th: {
            "page-title": "Nekō — ยกระดับสารอาหารเพื่อสุขภาพแมว",
            "announcement": "รับฟรีชามแมวมินิมอลสำหรับการสั่งซื้อครั้งแรก ใช้โค้ด: NEKOMINIMAL",
            "nav-philosophy": "ปรัชญา",
            "nav-shop": "ร้านค้า",
            "nav-calc": "คำนวณแคลอรี",
            "nav-finder": "ค้นหาสูตรอาหาร",
            "nav-faq": "FAQ",
            "nav-admin-dashboard": "แผงแอดมิน",
            "nav-login": "เข้าสู่ระบบ",
            "nav-logout": "ออกจากระบบ",
            "auth-tab-login": "เข้าสู่ระบบ",
            "auth-tab-register": "สมัครสมาชิก",
            "auth-login-desc": "กรุณากรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าใช้งาน",
            "auth-register-desc": "สร้างบัญชีผู้ใช้ใหม่เพื่อบันทึกประวัติการสั่งซื้อ",
            "admin-login-user": "ชื่อผู้ใช้ (Username)",
            "admin-login-pass": "รหัสผ่าน (Password)",
            "admin-login-submit": "เข้าสู่ระบบ",
            "auth-reg-user": "ชื่อผู้ใช้ (อังกฤษ/ตัวเลข 3-15 ตัว)",
            "auth-reg-pass": "รหัสผ่าน (อย่างน้อย 6 ตัว)",
            "auth-reg-confirm": "ยืนยันรหัสผ่าน",
            "auth-reg-submit": "สร้างบัญชีผู้ใช้",
            "hero-badge": "อาหารแมวเกรดพรีเมียม",
            "hero-title": "ยกระดับสารอาหาร<br><span class=\"highlight-text\">สำหรับแมวที่คุณรัก</span>",
            "hero-desc": "Nekō รังสรรค์สูตรอาหารโปรตีนแหล่งเดียวที่สมดุลทางโภชนาการด้วยเทคโนโลยีอบแห้งเยือกแข็ง (Freeze-Dry Raw) ออกแบบมาเพื่อสุขภาพที่ดีที่สุดของแมวของคุณ พร้อมบรรจุภัณฑ์ที่งดงามเข้ากับสุนทรียภาพในบ้านยุคใหม่",
            "hero-cta-shop": "สำรวจร้านค้า",
            "hero-cta-finder": "ค้นหาสูตรที่ใช่",
            "hero-float-title": "วัตถุดิบออร์แกนิก 100%",
            "hero-float-desc": "ไม่มีสารเติมแต่ง ไม่มีแป้งเชื่อมต่อ",
            "philo-subtitle": "มาตรฐานของ NEKŌ",
            "philo-title": "เมื่อดีไซน์อันงดงามมาบรรจบกับโภชนาการที่ดีที่สุด",
            "philo-c1-title": "โปรตีนจากแหล่งเดียว",
            "philo-c1-text": "เราคัดสรรวัตถุดิบเฉพาะเนื้อสัตว์เกรดมนุษย์ที่เลี้ยงด้วยหญ้าตามธรรมชาติและปลาที่จับจากธรรมชาติ ปราศจากเศษเนื้อสัตว์ป่นหรือผลพลอยได้เด็ดขาด",
            "philo-c2-title": "ล็อกคุณค่าด้วยความเย็นจัด",
            "philo-c2-text": "นวัตกรรมฟรีซดรายคงคุณค่าทางสารอาหาร เอนไซม์ และวิตามินตามธรรมชาติไว้ถึง 98% ให้แมวได้รับประโยชน์จากเนื้อดิบโดยปราศจากความเลอะเทอะ",
            "philo-c3-title": "ดีไซน์มินิมอล",
            "philo-c3-text": "เราเชื่อว่าอาหารแมวไม่ควรทำให้บ้านดูวุ่นวาย บรรจุภัณฑ์ของเราได้รับการออกแบบมาเพื่อเสริมสุนทรียภาพและกลมกลืนเข้ากับบ้านสไตล์มินิมอลของคุณอย่างสมบูรณ์แบบ",
            "shop-subtitle": "คอลเลกชันแบบด้าน (Matte)",
            "shop-title": "รังสรรค์ด้วยความพิถีพิถัน",
            "brand-credits": "*ข้อมูลและเครื่องหมายการค้าของสินค้าอ้างอิงเพื่อการสาธิตโภชนาการพรีเมียมจากแบรนด์ Ziwi Peak, Feline Natural, Orijen, Wellness CORE, Stella & Chewy's และ Acana ขอขอบพระคุณเป็นอย่างสูง",
            "calc-subtitle": "เครื่องคำนวณโภชนาการ",
            "calc-title": "ไม่ต้องเดา<br>ใช้หลักการทางคณิตศาสตร์",
            "calc-desc": "เมตาบอลิซึมของแมวมีความแตกต่างกันตามน้ำหนักและระดับกิจกรรม ใช้เครื่องคำนวณสไตล์มินิมอลของเราเพื่อค้นหาปริมาณพลังงานขั้นพื้นฐานที่ต้องการและสัดส่วนอาหารที่เหมาะสมที่สุดสำหรับเพื่อนรักของคุณ",
            "calc-weight-label": "น้ำหนักของแมว",
            "calc-activity-label": "ไลฟ์สไตล์ / ระดับกิจกรรม",
            "calc-act1-title": "เลี้ยงในบ้าน",
            "calc-act1-desc": "ทำหมัน / กิจกรรมน้อย",
            "calc-act2-title": "ปานกลาง",
            "calc-act2-desc": "กระฉับกระเฉง / ขี้เล่น",
            "calc-act3-title": "สูงมาก",
            "calc-act3-desc": "ออกนอกบ้าน / ลูกแมว",
            "calc-result-calories": "แคลอรีต่อวัน",
            "calc-result-recipe": "สูตรอาหารแนะนำ",
            "finder-subtitle": "เครื่องมือค้นหาสูตรอาหาร",
            "finder-title": "ค้นหาสูตรที่สมบูรณ์แบบสำหรับแมวของคุณ",
            "finder-desc": "ทำแบบทดสอบสั้นๆ 30 วินาทีเพื่อเลือกสูตรอาหารที่เหมาะสมกับสุขภาพและสัญชาตญาณความชอบของแมวคุณ",
            "quiz-q1": "1. แมวของคุณอยู่ในช่วงวัยใด?",
            "quiz-q1-o1-t": "ลูกแมว (Kitten)",
            "quiz-q1-o1-d": "เน้นการเจริญเติบโตและสมอง (0-12 เดือน)",
            "quiz-q1-o2-t": "แมวโต (Adult)",
            "quiz-q1-o2-d": "เน้นรักษาสุขภาพให้สมบูรณ์ (1-7 ปี)",
            "quiz-q1-o3-t": "แมวสูงวัย (Senior)",
            "quiz-q1-o3-d": "เน้นบำรุงข้อต่อและไต (7 ปีขึ้นไป)",
            "quiz-q2": "2. แมวของคุณชอบอาหารเนื้อสัมผัสแบบไหน?",
            "quiz-q2-o1-t": "เม็ดอบแห้ง (Dry Kibbles)",
            "quiz-q2-o1-d": "เม็ดกรุบกรอบผสมเนื้อฟรีซดรายเคี้ยวสนุก",
            "quiz-q2-o2-t": "สูตรเปียกพรีเมียม (Gourmet Wet)",
            "quiz-q2-o2-d": "น้ำซุปเข้มข้นพร้อมเนื้อบดละเอียดเพิ่มความชุ่มชื้น",
            "quiz-q2-o3-t": "เนื้อคำเล็ก (Pure Bites)",
            "quiz-q2-o3-d": "ขนมเนื้อสัตว์แท้ดิบอบแห้งชิ้นพอดีคำไร้สารปรุงแต่ง",
            "quiz-q3": "3. เป้าหมายสุขภาพที่สำคัญที่สุดคืออะไร?",
            "quiz-q3-o1-t": "ดูแลขนและผิวพรรณ",
            "quiz-q3-o1-d": "อุดมด้วยกรดไขมันโอเมก้า 3 บำรุงรากขนลดการหลุดร่วง",
            "quiz-q3-o2-t": "ระบบย่อยอาหารง่าย",
            "quiz-q3-o2-d": "มีพรีไบโอติกธรรมชาติช่วยเรื่องลำไส้ลดอาการท้องผูก",
            "quiz-q3-o3-t": "ควบคุมน้ำหนัก",
            "quiz-q3-o3-d": "สูตรควบคุมพลังงานและแอล-คาร์นิทีนเพื่อเผาผลาญไขมัน",
            "quiz-back": "ย้อนกลับ",
            "quiz-res-badge": "สูตรที่จับคู่ได้ดีที่สุด",
            "quiz-res-reasoning-title": "ทำไมสูตรนี้จึงเหมาะกับโปรไฟล์ของคุณ:",
            "quiz-res-add": "เพิ่มสูตรแนะนำลงตะกร้า",
            "quiz-res-reset": "เริ่มทำแบบทดสอบใหม่",
            "faq-subtitle": "FAQ",
            "faq-title": "คำถามที่พบบ่อย",
            "faq-q1": "อาหารดิบฟรีซดรายปลอดภัยต่อแมวของคุณจริงหรือไม่?",
            "faq-a1": "ปลอดภัยอย่างยิ่ง กระบวนการฟรีซดรายทำภายใต้อุณหภูมิต่ำกว่าจุดเยือกแข็งและดูดความชื้นออกทั้งหมด ซึ่งกำจัดน้ำที่แบคทีเรีย เช่น ซัลโมเนลลา และอีโคไล ใช้ในการเจริญเติบโรง แต่คงรักษาสารอาหารที่จำเป็นตามธรรมชาติไว้ครบถ้วน",
            "faq-q2": "ฉันควรเปลี่ยนอาหารมาเป็น Nekō อย่างไร?",
            "faq-a2": "แนะนำให้เปลี่ยนแบบค่อยเป็นค่อยไปในเวลา 7 วัน: ผสม Nekō 25% กับอาหารเดิมในวันที่ 1-2, ผสม 50/50 ในวันที่ 3-4, และผสม Nekō 75% ในวันที่ 5-6 ก่อนจะเปลี่ยนเป็น Nekō 100% เต็มตัวในวันที่ 7 เพื่อไม่ให้กระทบต่อทางเดินอาหาร",
            "faq-q3": "ลูกแมวสามารถทานสูตรของ Nekō ได้หรือไม่?",
            "faq-a3": "ทานได้ครับ สูตรไก่อุดมไปด้วยระดับโปรตีนเข้มข้นที่เหมาะกับลูกแมวที่กำลังโต สำหรับลูกแมวอายุต่ำกว่า 6 เดือน แนะนำให้นำเม็ดอบแห้งแช่น้ำอุ่นหรือน้ำซุปกระดูกเพื่อให้เคี้ยวได้ง่ายขึ้น",
            "faq-q4": "บรรจุภัณฑ์สามารถนำไปรีไซเคิลได้หรือไม่?",
            "faq-a4": "ได้ครับ ซองและกระป๋องของเราทำจากวัสดุเดี่ยวรีไซเคิลได้ 100% ออกแบบมาโดยไม่ใช้อะลูมิเนียมประกบชั้นหนาแต่ยังคงเก็บกักสารอาหารได้ดีเยี่ยม เพื่อการแยกขยะที่ง่ายและเป็นมิตรต่อสิ่งแวดล้อม",
            "footer-tagline": "สารอาหารที่สอดคล้องกับธรรมชาติของแมว บรรจุในแพ็กเกจที่แต่งเติมความงามให้บ้านยุคใหม่",
            "footer-col1-title": "คอลเลกชัน",
            "footer-col1-l1": "สูตรอบแห้งเม็ด",
            "footer-col1-l2": "สูตรเปียกกระป๋อง",
            "footer-col1-l3": "ขนมฟรีซดราย",
            "footer-col2-title": "ข้อมูลช่วยเหลือ",
            "footer-col2-l1": "เครื่องคำนวณอาหารประจำวัน",
            "footer-col2-l2": "แบบทดสอบเลือกสูตรอาหาร",
            "footer-col2-l3": "วิทยาศาสตร์และความปลอดภัย",
            "footer-news-title": "ข่าวสารและโปรโมชัน",
            "footer-news-desc": "รับข้อมูลวิจัยโภชนาการแมวที่ถูกต้องและส่วนลดพิเศษคอลเลกชันใหม่ก่อนใคร",
            "footer-news-btn": "เข้าร่วม",
            "footer-bottom-privacy": "นโยบายความเป็นส่วนตัว",
            "footer-bottom-terms": "เงื่อนไขการใช้บริการ",
            "cart-title": "ตะกร้าสินค้า",
            "cart-empty-text": "ตะกร้าสินค้าของคุณว่างเปล่า",
            "cart-empty-btn": "เริ่มช้อปปิ้ง",
            "cart-subtotal-label": "ราคารวม",
            "cart-shipping-info": "ค่าจัดส่งและภาษีจะคำนวณในขั้นตอนการชำระเงิน",
            "cart-checkout-btn": "ดำเนินการชำระเงิน",
            "modal-success-title": "ขอบคุณสำหรับการสั่งซื้อ",
            "modal-success-desc": "ใบสั่งซื้อของคุณเสร็จสิ้นเรียบร้อยแล้ว ลิงก์ติดตามและอีเมลยืนยันจะถูกส่งไปที่อีเมลของคุณโดยเร็ว",
            "modal-success-ref": "รหัสอ้างอิงใบสั่งซื้อ",
            "modal-success-close": "กลับสู่หน้าหลัก"
        },
        en: {
            "page-title": "Nekō — Feline Nourishment, Elevated.",
            "announcement": "Complimentary minimalist bowl with your first purchase. Use code: NEKOMINIMAL",
            "nav-philosophy": "Philosophy",
            "nav-shop": "Shop",
            "nav-calc": "Calorie Calculator",
            "nav-finder": "Recipe Finder",
            "nav-faq": "FAQ",
            "nav-admin-dashboard": "Admin Panel",
            "nav-login": "Login",
            "nav-logout": "Logout",
            "auth-tab-login": "Login",
            "auth-tab-register": "Register",
            "auth-login-desc": "Please enter your username and password.",
            "auth-register-desc": "Create a new account to keep order history.",
            "admin-login-user": "Username",
            "admin-login-pass": "Password",
            "admin-login-submit": "Login",
            "auth-reg-user": "Username (Alphanumeric 3-15 chars)",
            "auth-reg-pass": "Password (Min 6 chars)",
            "auth-reg-confirm": "Confirm Password",
            "auth-reg-submit": "Create Account",
            "hero-badge": "Premium Feline Nutrition",
            "hero-title": "Feline nourishment,<br><span class=\"highlight-text\">elevated.</span>",
            "hero-desc": "Nekō crafts scientifically balanced, single-source protein recipes with raw-freeze technology. Designed for the optimal health of your cat, packaged for the aesthetic of your modern home.",
            "hero-cta-shop": "Explore Shop",
            "hero-cta-finder": "Find Perfect Blend",
            "hero-float-title": "100% Organic Ingredients",
            "hero-float-desc": "No fillers, no artificial binders.",
            "philo-subtitle": "THE NEKŌ STANDARD",
            "philo-title": "Form meets function in every scoop.",
            "philo-c1-title": "Pure-Source Proteins",
            "philo-c1-text": "We source exclusively from human-grade, pasture-raised meats and wild-caught fish. Absolutely zero meat meals or sub-products.",
            "philo-c2-title": "Raw-Freeze Locking",
            "philo-c2-text": "Our state-of-the-art sublimation process preserves 98% of natural vitamins and enzymes, providing your cat raw food benefits without the mess.",
            "philo-c3-title": "Minimalist Design",
            "philo-c3-text": "We believe cat nutrition shouldn't look chaotic. Our packaging complements your space, integrating seamlessly into your minimalist home.",
            "shop-subtitle": "OUR MATTE COLLECTION",
            "shop-title": "Crafted with precision.",
            "brand-credits": "*Product information and trademarks are referenced for demonstration purposes from Ziwi Peak, Feline Natural, Orijen, Wellness CORE, Stella & Chewy's, and Acana. Gratefully acknowledged.",
            "calc-subtitle": "THE NUTRITION CALCULATOR",
            "calc-title": "Zero guessing.<br>Just raw math.",
            "calc-desc": "Feline metabolism varies heavily by weight and activity. Use our minimalist calculator to find the exact daily caloric baseline and meal portions optimized specifically for your companion.",
            "calc-weight-label": "Cat's Weight",
            "calc-activity-label": "Lifestyle / Activity Level",
            "calc-act1-title": "Sedentary",
            "calc-act1-desc": "Indoor / Neutered",
            "calc-act2-title": "Moderate",
            "calc-act2-desc": "Active / Playful",
            "calc-act3-title": "High",
            "calc-act3-desc": "Outdoor / Kitten",
            "calc-result-calories": "Daily Calories",
            "calc-result-recipe": "Recommended Recipe",
            "finder-subtitle": "THE FINDER WIZARD",
            "finder-title": "Discover their perfect blend.",
            "finder-desc": "Take our 30-second formula recommendation quiz to tailor a nutritional profile matches your cat's palate.",
            "quiz-q1": "1. What is your cat's life stage?",
            "quiz-q1-o1-t": "Kitten",
            "quiz-q1-o1-d": "Growth & Brain support (0-12 months)",
            "quiz-q1-o2-t": "Adult",
            "quiz-q1-o2-d": "Optimal maintenance (1-7 years)",
            "quiz-q1-o3-t": "Senior",
            "quiz-q1-o3-d": "Joint & Kidney longevity (7+ years)",
            "quiz-q2": "2. What is their texture of choice?",
            "quiz-q2-o1-t": "Dry Kibbles",
            "quiz-q2-o1-d": "Crisp freeze-dried meat combinations",
            "quiz-q2-o2-t": "Gourmet Wet",
            "quiz-q2-o2-d": "Smooth, nutrient-rich broths & pate",
            "quiz-q2-o3-t": "Pure Bites",
            "quiz-q2-o3-d": "Single ingredient raw treat topper",
            "quiz-q3": "3. What is the primary wellness goal?",
            "quiz-q3-o1-t": "Coat & Skin Glow",
            "quiz-q3-o1-d": "Rich in Omega-3 fatty acids",
            "quiz-q3-o2-t": "Sensitive Stomachs",
            "quiz-q3-o2-d": "Includes natural prebiotics & fiber",
            "quiz-q3-o3-t": "Weight Balance",
            "quiz-q3-o3-d": "L-Carnitine & calorie-controlled ratio",
            "quiz-back": "Back",
            "quiz-res-badge": "Perfect Match",
            "quiz-res-reasoning-title": "Why it fits your profile:",
            "quiz-res-add": "Add Recommended Recipe",
            "quiz-res-reset": "Restart Quiz",
            "faq-subtitle": "FAQ",
            "faq-title": "Answering your concerns.",
            "faq-q1": "Is freeze-dried raw food completely safe?",
            "faq-a1": "Yes, absolutely. Our freeze-drying process relies on sublimation under sub-zero temperatures. It eliminates moisture that bacteria like Salmonella and E. coli require to thrive, while locking in nutrient structures without heat damage.",
            "faq-q2": "How do I transition my cat to Nekō?",
            "faq-a2": "We recommend a gradual 7-day transition: mix 25% Nekō with 75% old food on days 1-2, 50/50 on days 3-4, and 75% Nekō on days 5-6, before feeding 100% Nekō on day 7. This prevents stomach sensitivity.",
            "faq-q3": "Is it okay to feed Nekō recipes to kittens?",
            "faq-a3": "Absolutely. Our Dry Raw Pasture Chicken provides high protein levels optimal for growth. For kittens under 6 months, we suggest hydrating the dry raw kibbles with warm water or bone broth for easier chewing.",
            "faq-q4": "Can I recycle the minimalist packaging?",
            "faq-a4": "Yes, our bags and cans are made from 100% recyclable mono-materials. They are designed to preserve nutrients without aluminum layer inserts, making recycling effortless in home paper and metal streams.",
            "footer-tagline": "Nourishment aligned with feline nature. Packaged for the modern aesthetic space.",
            "footer-col1-title": "Collections",
            "footer-col1-l1": "Dry Recipes",
            "footer-col1-l2": "Wet Cans",
            "footer-col1-l3": "Freeze-Dried treats",
            "footer-col2-title": "Resources",
            "footer-col2-l1": "Daily Intake Calculator",
            "footer-col2-l2": "Blend Finder Quiz",
            "footer-col2-l3": "Science and Safety",
            "footer-news-title": "Newsletter",
            "footer-news-desc": "Subscribe for raw cat nutrition research and exclusive minimalist launches.",
            "footer-news-btn": "Join",
            "footer-bottom-privacy": "Privacy Policy",
            "footer-bottom-terms": "Terms of Service",
            "cart-title": "Shopping Drawer",
            "cart-empty-text": "Your drawer is currently empty.",
            "cart-empty-btn": "Start Shopping",
            "cart-subtotal-label": "Subtotal",
            "cart-shipping-info": "Shipping and duties calculated at checkout.",
            "cart-checkout-btn": "Proceed to Checkout",
            "modal-success-title": "Thank you, Companion.",
            "modal-success-desc": "Your order was placed successfully. A confirmation email and tracking link will be sent shortly.",
            "modal-success-ref": "Simulated Reference",
            "modal-success-close": "Return to Shop"
        }
    };

    let currentLang = localStorage.getItem('neko_lang') || 'th';

    /* ==========================================================================
       SVG PRODUCT CONSTANTS & DEFAULT PRODUCTS (Real Brands Database)
       ========================================================================== */
    const productVisuals = {
        'dry-raw': `
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#EAE6DF"/>
                <rect x="70" y="50" width="60" height="100" rx="6" fill="#1A1A1A"/>
                <circle cx="100" cy="85" r="18" fill="#F7F5F0" opacity="0.15"/>
                <path d="M90 85C95 80 105 80 110 85" stroke="#F7F5F0" stroke-width="2" stroke-linecap="round"/>
                <path d="M85 115 H115" stroke="#F7F5F0" stroke-width="2" opacity="0.4"/>
                <circle cx="70" cy="150" r="10" fill="#D47A5C"/>
                <circle cx="140" cy="140" r="6" fill="#D47A5C" opacity="0.6"/>
            </svg>
        `,
        'velvet-wet': `
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#F0EAE1"/>
                <ellipse cx="100" cy="110" rx="55" ry="30" fill="#1A1A1A"/>
                <ellipse cx="100" cy="105" rx="50" ry="25" fill="#D47A5C"/>
                <ellipse cx="95" cy="102" rx="35" ry="15" fill="#F7F5F0" opacity="0.3"/>
                <path d="M50 85L150 85" stroke="#1A1A1A" stroke-width="2" stroke-dasharray="4 4"/>
                <circle cx="130" cy="65" r="8" fill="#1A1A1A"/>
            </svg>
        `,
        'salmon-bites': `
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="#EAE2DA"/>
                <rect x="85" y="60" width="30" height="30" rx="4" fill="#D47A5C" transform="rotate(15 100 75)"/>
                <rect x="65" y="105" width="25" height="25" rx="4" fill="#D47A5C" opacity="0.8" transform="rotate(-10 77.5 117.5)"/>
                <rect x="115" y="100" width="28" height="28" rx="4" fill="#1A1A1A" transform="rotate(45 129 114)"/>
            </svg>
        `
    };

    const productImages = {
        'dry-raw': 'img/ziwi_lamb.png',
        'velvet-wet': 'img/wellness_velvet.png',
        'salmon-bites': 'img/feline_chicken_lamb.png',
        'orijen-dry': 'img/orijen_dry.png',
        'stella-chicken': 'img/stella_chicken.png',
        'feline-beef-hoki': 'img/feline_beef_hoki.png',
        'ziwi-beef-can': 'img/ziwi_beef_can.png'
    };

    const getProductImageHTML = (pOrItem) => {
        const cleanId = pOrItem.id.replace('custom-', '');
        if (productImages[cleanId]) {
            return `<img src="${productImages[cleanId]}" alt="${escapeHTML(pOrItem.name || pOrItem.name_en)}" class="product-img-file" />`;
        }
        // Lookup the original product's type
        const originalProd = (typeof products !== 'undefined' && products) ? products.find(p => p.id === pOrItem.id) : null;
        const type = originalProd ? originalProd.type : (pOrItem.type || 'dry-raw');

        if (productImages[type]) {
            return `<img src="${productImages[type]}" alt="${escapeHTML(pOrItem.name || pOrItem.name_en)}" class="product-img-file" />`;
        }
        return productVisuals[type] || productVisuals['dry-raw'];
    };

    const DEFAULT_PRODUCTS = [
        {
            id: 'dry-raw',
            type: 'dry-raw',
            price_th: 1890,
            price_en: 58,
            name_th: 'Ziwi Peak Air-Dried — แกะเลี้ยงอิสระนิวซีแลนด์',
            name_en: 'Ziwi Peak Air-Dried — New Zealand Free-Range Lamb',
            desc_th: 'อาหารดิบอบแห้งระดับพรีเมียมจากแกะเลี้ยงอิสระในนิวซีแลนด์ 96% ปราศจากแป้งและธัญพืช',
            desc_en: 'Gently air-dried premium recipe containing 96% free-range lamb, organs, and green mussels.',
            specs_th: [
                { label: 'โปรตีน', value: '38% Min' },
                { label: 'รูปแบบ', value: 'ลมร้อนอบแห้ง (Air-Dried)' },
                { label: 'น้ำหนัก', value: '1.0 kg' }
            ],
            specs_en: [
                { label: 'Protein', value: '38% Min' },
                { label: 'Form', value: 'Gently Air-Dried' },
                { label: 'Weight', value: '1.0 kg' }
            ]
        },
        {
            id: 'velvet-wet',
            type: 'velvet-wet',
            price_th: 790,
            price_en: 24,
            name_th: 'Wellness CORE Velvet — ทูน่าและแซลมอนชิ้นฝอย',
            name_en: 'Wellness CORE Velvet — Shredded Tuna & Salmon',
            desc_th: 'อาหารเปียกสูตรเกรนฟรีทำจากเนื้อทูน่าและแซลมอนแท้ชิ้นฝอยในน้ำซุป ช่วยเติมน้ำให้กับร่างกายน้องแมว',
            desc_en: 'Grain-free delicate shreds of tuna and salmon in delicious gravy broth for hydration.',
            specs_th: [
                { label: 'โปรตีน', value: '10% Min (ชุ่มชื้น)' },
                { label: 'รูปแบบ', value: 'ชิ้นเนื้อฝอยในน้ำเกรวี่' },
                { label: 'ปริมาณ', value: '8 x 79g กระป๋อง' }
            ],
            specs_en: [
                { label: 'Protein', value: '10% Min (Moist)' },
                { label: 'Form', value: 'Shreds in Gravy' },
                { label: 'Qty', value: '8 x 79g Cans' }
            ]
        },
        {
            id: 'salmon-bites',
            type: 'salmon-bites',
            price_th: 1490,
            price_en: 45,
            name_th: 'Feline Natural Freeze-Dried — ไก่และแกะฟรีซดราย',
            name_en: 'Feline Natural Freeze-Dried — Free-Range Chicken & Lamb',
            desc_th: 'อาหารดิบฟรีซดรายเกรดมนุษย์ ผลิตจากโปรตีนไก่และแกะนิวซีแลนด์ 99% ล็อกสารอาหารสดใหม่ครบถัน',
            desc_en: 'Freeze-dried raw diet made from 99% chicken, lamb, and green-lipped mussels from New Zealand.',
            specs_th: [
                { label: 'โปรตีน', value: '48% Min' },
                { label: 'รูปแบบ', value: 'อบแห้งเยือกแข็ง (Freeze-Dried)' },
                { label: 'น้ำหนัก', value: '320 g' }
            ],
            specs_en: [
                { label: 'Protein', value: '48% Min' },
                { label: 'Form', value: 'Freeze-Dried Raw' },
                { label: 'Weight', value: '320 g' }
            ]
        },
        {
            id: 'orijen-dry',
            type: 'dry-raw',
            price_th: 1290,
            price_en: 39,
            name_th: 'Orijen Dry — สูตรควบคุมน้ำหนักและฟิตแอนด์ทริม',
            name_en: 'Orijen Dry — Fit & Trim Premium Recipe',
            desc_th: 'อาหารเม็ดเกรดพรีเมียมระดับรางวัล ผลิตจากไก่ งวง และปลาธรรมชาติ 85% ช่วยควบคุมน้ำหนักและสร้างกล้ามเนื้อ',
            desc_en: 'Award-winning biologically appropriate dry food featuring 85% poultry and wild-caught fish.',
            specs_th: [
                { label: 'โปรตีน', value: '44% Min' },
                { label: 'รูปแบบ', value: 'เม็ดเกรดโฮลิสติก' },
                { label: 'น้ำหนัก', value: '1.8 kg' }
            ],
            specs_en: [
                { label: 'Protein', value: '44% Min' },
                { label: 'Form', value: 'Holistic Dry Kibble' },
                { label: 'Weight', value: '1.8 kg' }
            ]
        },
        {
            id: 'stella-chicken',
            type: 'salmon-bites',
            price_th: 1390,
            price_en: 42,
            name_th: 'Stella & Chewy\'s Freeze-Dried — รสไก่ Chick Chick Chicken',
            name_en: 'Stella & Chewy\'s Freeze-Dried — Chick Chick Chicken Dinner Patties',
            desc_th: 'อาหารดิบฟรีซดรายรูปแพตตี้ทำจากไก่เลี้ยงแบบปล่อยและกระดูกบดเพื่อสารอาหารธรรมชาติสูงสุด เติมน้ำอุ่นก่อนเสิร์ฟ',
            desc_en: 'Freeze-dried raw dinner patties crafted from cage-free chicken, organs, and bone. Rehydrate with warm water.',
            specs_th: [
                { label: 'โปรตีน', value: '45% Min' },
                { label: 'รูปแบบ', value: 'อบแห้งเยือกแข็ง (Dinner Patties)' },
                { label: 'ปริมาณ', value: '255 g' }
            ],
            specs_en: [
                { label: 'Protein', value: '45% Min' },
                { label: 'Form', value: 'Freeze-Dried Dinner Patties' },
                { label: 'Qty', value: '255 g' }
            ]
        },
        {
            id: 'feline-beef-hoki',
            type: 'salmon-bites',
            price_th: 1590,
            price_en: 49,
            name_th: 'Feline Natural Freeze-Dried — สูตรเนื้อวัวและปลาโฮกิ',
            name_en: 'Feline Natural Freeze-Dried — Beef & Hoki Feast',
            desc_th: 'สูตรอาหารดิบฟรีซดรายระดับซูเปอร์พรีเมียม ผสมเนื้อวัวเลี้ยงด้วยหญ้าธรรมชาติและปลาโฮกิป่าเพื่อการบำรุงหัวใจและระบบสมอง',
            desc_en: 'Super-premium freeze-dried raw recipe combining grass-fed beef and wild-caught Hoki fish for heart and cognitive health.',
            specs_th: [
                { label: 'โปรตีน', value: '47% Min' },
                { label: 'รูปแบบ', value: 'อบแห้งเยือกแข็ง (Freeze-Dried Raw)' },
                { label: 'น้ำหนัก', value: '320 g' }
            ],
            specs_en: [
                { label: 'Protein', value: '47% Min' },
                { label: 'Form', value: 'Freeze-Dried Raw' },
                { label: 'Weight', value: '320 g' }
            ]
        },
        {
            id: 'ziwi-beef-can',
            type: 'velvet-wet',
            price_th: 160,
            price_en: 5,
            name_th: 'Ziwi Peak Canned Wet — สูตรเนื้อวัวเลี้ยงธรรมชาติ',
            name_en: 'Ziwi Peak Canned Wet — New Zealand Grass-Fed Beef Recipe',
            desc_th: 'อาหารเปียกพรีเมียมในน้ำซุปกระดูกเข้มข้น ทำจากเนื้อวัวและเครื่องในสัตว์ 92% เติมความชุ่มชื้นและบำรุงข้อต่อด้วยหอยแมลงภู่ปากเขียว',
            desc_en: 'Premium wet canned recipe featuring 92% grass-fed beef, organs, and green-lipped mussels in a delicious bone broth.',
            specs_th: [
                { label: 'โปรตีน', value: '9% Min (ชุ่มชื้นสูง)' },
                { label: 'รูปแบบ', value: 'อาหารเปียกกระป๋อง (Premium Wet Can)' },
                { label: 'ปริมาณ', value: '85 g' }
            ],
            specs_en: [
                { label: 'Protein', value: '9% Min (Moist)' },
                { label: 'Form', value: 'Premium Canned Wet' },
                { label: 'Qty', value: '85 g' }
            ]
        }
    ];

    let products = JSON.parse(localStorage.getItem('neko_products'));

    // Force-reload products database if new default products are missing
    if (!products || products.length < 7 || !products.some(p => p.id === 'ziwi-beef-can')) {
        products = DEFAULT_PRODUCTS;
        localStorage.setItem('neko_products', JSON.stringify(products));
    }

    const saveProductsToStorage = () => {
        localStorage.setItem('neko_products', JSON.stringify(products));
    };

    /* ==========================================================================
       USER DATABASE & SECURITY (Authentication Credentials)
       ========================================================================== */
    const DEFAULT_USERS = [
        { username: 'admin1122', password: 'admin1122', role: 'admin' },
    ];

    let users = JSON.parse(localStorage.getItem('neko_users')) || DEFAULT_USERS;

    const saveUsersToStorage = () => {
        localStorage.setItem('neko_users', JSON.stringify(users));
    };

    // Active session retrieval
    let activeUser = JSON.parse(sessionStorage.getItem('neko_active_user')) || null;

    /* ==========================================================================
       CART STATE & DRAWER MANAGEMENT
       ========================================================================== */
    let cart = [];

    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartFooter = document.getElementById('cartFooter');
    const cartBadge = document.getElementById('cartBadge');

    const openCart = () => {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    const addToCart = (id, name, price) => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ id, name, price: parseFloat(price), qty: 1 });
        }
        updateCartUI();
        openCart();
    };

    const removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    };

    const changeQty = (id, delta) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.qty += parseInt(delta);
            if (item.qty <= 0) {
                removeFromCart(id);
            } else {
                updateCartUI();
            }
        }
    };

    const updateCartUI = () => {
        const totalItemsCount = cart.reduce((total, item) => total + item.qty, 0);
        cartBadge.textContent = totalItemsCount;

        cartBadge.style.transform = 'scale(1.2)';
        setTimeout(() => cartBadge.style.transform = '', 200);

        const curSymbol = currentLang === 'th' ? '฿' : '$';

        // Cart shipping progress DOM nodes lookup
        const cartShippingProgress = document.getElementById('cartShippingProgress');
        const shippingProgressText = document.getElementById('shippingProgressText');
        const shippingProgressBar = document.getElementById('shippingProgressBar');

        if (cart.length === 0) {
            if (cartShippingProgress) cartShippingProgress.style.display = 'none';
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <span class="empty-emoji">🐈</span>
                    <p data-i18n="cart-empty-text">${translations[currentLang]["cart-empty-text"]}</p>
                    <a href="#shop" class="btn btn-dark btn-sm" id="emptyCartShopBtn" data-i18n="cart-empty-btn">${translations[currentLang]["cart-empty-btn"]}</a>
                </div>
            `;
            document.getElementById('emptyCartShopBtn').addEventListener('click', closeCart);
            cartFooter.style.display = 'none';
        } else {
            let htmlContent = '';
            let subtotal = 0;

            cart.forEach(item => {
                // Fix Currency Switching Bug: lookup current price in active language
                const prod = products.find(p => p.id === item.id);
                const activePrice = prod ? (currentLang === 'th' ? prod.price_th : prod.price_en) : item.price;
                const itemTotal = activePrice * item.qty;
                subtotal += itemTotal;

                const visualHTML = getProductImageHTML(item);
                const safeName = escapeHTML(item.name);

                htmlContent += `
                    <div class="cart-item">
                        <div class="cart-item-visual">
                            ${visualHTML}
                        </div>
                        <div class="cart-item-details">
                            <h4 class="cart-item-name">${safeName}</h4>
                            <span class="cart-item-price">${curSymbol}${activePrice.toLocaleString()}</span>
                            <div class="cart-item-actions">
                                <div class="qty-selector">
                                    <button class="qty-btn dec-btn" data-id="${item.id}">-</button>
                                    <span class="qty-number">${item.qty}</span>
                                    <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
                                </div>
                                <button class="remove-item-btn" data-id="${item.id}">${currentLang === 'th' ? 'นำออก' : 'Remove'}</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Update free shipping progress details
            if (cartShippingProgress) {
                cartShippingProgress.style.display = 'block';
                const limit = currentLang === 'th' ? 2000 : 60;

                if (subtotal >= limit) {
                    cartShippingProgress.classList.add('free-shipping');
                    shippingProgressText.innerHTML = currentLang === 'th' ?
                        'ยินดีด้วย! คุณได้รับสิทธิ์จัดส่งฟรีแล้ว 🎉' :
                        'Congratulations! You qualify for Free Shipping! 🎉';
                    shippingProgressBar.style.width = '100%';
                } else {
                    cartShippingProgress.classList.remove('free-shipping');
                    const needed = limit - subtotal;
                    shippingProgressText.innerHTML = currentLang === 'th' ?
                        `ช้อปเพิ่มอีก <strong>฿${needed.toLocaleString()}</strong> เพื่อรับสิทธิ์จัดส่งฟรี!` :
                        `Add <strong>$${needed.toLocaleString()}</strong> more to qualify for Free Shipping!`;
                    const pct = Math.min(100, Math.round((subtotal / limit) * 100));
                    shippingProgressBar.style.width = `${pct}%`;
                }
            }

            cartItemsContainer.innerHTML = htmlContent;
            cartSubtotal.textContent = `${curSymbol}${subtotal.toLocaleString()}`;
            cartFooter.style.display = 'block';

            cartItemsContainer.querySelectorAll('.dec-btn').forEach(btn => {
                btn.addEventListener('click', () => changeQty(btn.dataset.id, -1));
            });
            cartItemsContainer.querySelectorAll('.inc-btn').forEach(btn => {
                btn.addEventListener('click', () => changeQty(btn.dataset.id, 1));
            });
            cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
            });
        }
    };

    /* ==========================================================================
       PRODUCT DYNAMIC CATALOG RENDERING
       ========================================================================== */
    const productGrid = document.getElementById('productGrid');

    const renderShopProducts = () => {
        if (!productGrid) return;
        productGrid.innerHTML = '';

        products.forEach(p => {
            const rawName = currentLang === 'th' ? p.name_th : p.name_en;
            const rawDesc = currentLang === 'th' ? p.desc_th : p.desc_en;

            // XSS mitigation: escape names and descriptions
            const name = escapeHTML(rawName);
            const desc = escapeHTML(rawDesc);

            const price = currentLang === 'th' ? parseInt(p.price_th) : parseInt(p.price_en);
            const curSymbol = currentLang === 'th' ? '฿' : '$';
            const visual = getProductImageHTML(p);

            const specList = currentLang === 'th' ? (p.specs_th || []) : (p.specs_en || []);
            let specsHtml = '';
            specList.forEach(s => {
                specsHtml += `<li>${escapeHTML(s.label)} <span>${escapeHTML(s.value)}</span></li>`;
            });

            const card = document.createElement('div');
            card.className = 'product-card animate-fade-in';
            card.setAttribute('data-id', p.id);
            card.setAttribute('data-name', name);
            card.setAttribute('data-price', price);

            const tag = p.type === 'dry-raw' ? (currentLang === 'th' ? 'สูตรอบแห้ง' : 'Dry Recipe') :
                p.type === 'velvet-wet' ? (currentLang === 'th' ? 'สูตรเปียก' : 'Wet Recipe') :
                    (currentLang === 'th' ? 'ขนมฟรีซดราย' : 'Freeze-Dried Treat');

            card.innerHTML = `
                <div class="product-visual">
                    <div class="svg-container">
                        ${visual}
                    </div>
                    <span class="product-tag">${escapeHTML(tag)}</span>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${name}</h3>
                    <p class="product-desc">${desc}</p>
                    <ul class="product-specs">
                        ${specsHtml}
                    </ul>
                    <div class="product-action">
                        <span class="product-price">${curSymbol}${price.toLocaleString()}</span>
                        <button class="btn btn-dark btn-add-cart">${currentLang === 'th' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}</button>
                    </div>
                </div>
            `;

            card.querySelector('.btn-add-cart').addEventListener('click', () => {
                addToCart(p.id, name, price);
            });

            productGrid.appendChild(card);
        });
    };

    /* ==========================================================================
       CHECKOUT MODAL & ORDERS SAVING WITH DETAILS
       ========================================================================== */
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const orderIdVal = document.getElementById('orderIdVal');

    // Advanced Checkout Form Elements
    const checkoutDetailsModal = document.getElementById('checkoutDetailsModal');
    const closeCheckoutFormBtn = document.getElementById('closeCheckoutFormBtn');
    const checkoutDetailsForm = document.getElementById('checkoutDetailsForm');
    const checkoutSummaryItems = document.getElementById('checkoutSummaryItems');
    const promoCodeInput = document.getElementById('promoCodeInput');
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoStatusMsg = document.getElementById('promoStatusMsg');

    // Calc elements
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const discountRow = document.getElementById('discountRow');
    const checkoutDiscount = document.getElementById('checkoutDiscount');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');

    let orders = JSON.parse(localStorage.getItem('neko_orders')) || [];
    let activePromo = null; // keeps track of applied promo object
    let qrTimerInterval = null;

    const renderCheckoutSummary = () => {
        if (!checkoutSummaryItems) return;
        checkoutSummaryItems.innerHTML = '';

        const curSymbol = currentLang === 'th' ? '฿' : '$';

        cart.forEach(item => {
            const prod = products.find(p => p.id === item.id);
            const activePrice = prod ? (currentLang === 'th' ? prod.price_th : prod.price_en) : item.price;

            const row = document.createElement('div');
            row.className = 'checkout-item-row';
            row.innerHTML = `
                <span class="item-info">${escapeHTML(item.name)} <strong>x${item.qty}</strong></span>
                <span class="item-price">${curSymbol}${(activePrice * item.qty).toLocaleString()}</span>
            `;
            checkoutSummaryItems.appendChild(row);
        });
    };

    const calculateCheckoutPrices = () => {
        const subtotal = cart.reduce((t, item) => {
            const prod = products.find(p => p.id === item.id);
            const activePrice = prod ? (currentLang === 'th' ? prod.price_th : prod.price_en) : item.price;
            return t + (activePrice * item.qty);
        }, 0);
        const curSymbol = currentLang === 'th' ? '฿' : '$';

        let discountVal = 0;
        const limit = currentLang === 'th' ? 2000 : 60;
        const standardShipping = currentLang === 'th' ? 80 : 3;
        let shippingFee = subtotal >= limit ? 0 : standardShipping;

        if (activePromo) {
            if (activePromo.type === 'percent') {
                discountVal = Math.round(subtotal * activePromo.value);
            } else if (activePromo.type === 'freeship') {
                shippingFee = 0;
            }
        }

        const grandTotal = Math.max(0, subtotal - discountVal + shippingFee);

        checkoutSubtotal.textContent = `${curSymbol}${subtotal.toLocaleString()}`;
        checkoutShipping.textContent = shippingFee === 0 ?
            (currentLang === 'th' ? 'ฟรี' : 'Free') :
            `${curSymbol}${shippingFee}`;

        if (discountVal > 0) {
            discountRow.style.display = 'flex';
            checkoutDiscount.textContent = `-${curSymbol}${discountVal.toLocaleString()}`;
        } else {
            discountRow.style.display = 'none';
        }

        checkoutGrandTotal.textContent = `${curSymbol}${grandTotal.toLocaleString()}`;

        return { subtotal, discountVal, shippingFee, grandTotal };
    };

    // PromptPay countdown helper
    const startPromptPayTimer = () => {
        const timerEl = document.getElementById('qrTimer');
        if (!timerEl) return;

        clearInterval(qrTimerInterval);
        let timeRemaining = 300; // 5 minutes

        const updateTimer = () => {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            const displayMin = minutes < 10 ? '0' + minutes : minutes;
            const displaySec = seconds < 10 ? '0' + seconds : seconds;

            timerEl.textContent = currentLang === 'th' ?
                `รหัส QR หมดอายุใน ${displayMin}:${displaySec} นาที` :
                `QR code expires in ${displayMin}:${displaySec} min`;

            if (timeRemaining <= 0) {
                clearInterval(qrTimerInterval);
                timerEl.textContent = currentLang === 'th' ? 'สิทธิ์ชำระเงินหมดอายุแล้ว กรุณาสร้าง QR ใหม่' : 'QR code expired. Generate again.';
            }
            timeRemaining--;
        };

        updateTimer();
        qrTimerInterval = setInterval(updateTimer, 1000);
    };

    // Toggle Payment Method Selector
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            paymentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Hide all panels
            document.querySelectorAll('.pay-panel').forEach(panel => {
                panel.style.display = 'none';
                panel.classList.remove('active');
            });

            // Show selected panel
            const method = card.dataset.method;
            const targetPanel = document.getElementById(`panel-${method}`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.classList.add('active');
            }

            if (method === 'promptpay') {
                startPromptPayTimer();
            } else {
                clearInterval(qrTimerInterval);
            }
        });
    });

    // Handle checkout button click in cart drawer
    const openCheckoutForm = () => {
        if (cart.length === 0) {
            showNotification(currentLang === 'th' ? 'ไม่มีสินค้าในตะกร้า' : 'Your cart is empty', 'error');
            return;
        }

        closeCart();

        // Prefill name if logged in
        if (activeUser) {
            const cleanName = activeUser.username.replace(/^(Google|Facebook|Line)_User_\d+$/, (match, p1) => {
                return p1 + ' User';
            });
            document.getElementById('checkoutFullName').value = cleanName;
        } else {
            document.getElementById('checkoutFullName').value = '';
        }

        // Reset promo states
        activePromo = null;
        promoCodeInput.value = '';
        promoStatusMsg.style.display = 'none';

        renderCheckoutSummary();
        calculateCheckoutPrices();

        checkoutDetailsModal.classList.add('active');
    };

    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutForm);

    if (closeCheckoutFormBtn) {
        closeCheckoutFormBtn.addEventListener('click', () => {
            checkoutDetailsModal.classList.remove('active');
            clearInterval(qrTimerInterval);
        });
    }

    // Apply Coupon Promo Logic
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', () => {
            const code = promoCodeInput.value.trim().toUpperCase();
            promoStatusMsg.className = 'promo-status-msg';

            if (!code) {
                promoStatusMsg.textContent = currentLang === 'th' ? 'กรุณากรอกรหัสโปรโมชัน' : 'Please enter a code';
                promoStatusMsg.classList.add('error');
                return;
            }

            const promos = {
                'WELCOME10': { type: 'percent', value: 0.1, name: 'WELCOME10 (10%)' },
                'NEKOMINIMAL': { type: 'percent', value: 0.1, name: 'NEKOMINIMAL (10%)' },
                'NEKO50': { type: 'percent', value: 0.5, name: 'NEKO50 (50%)' },
                'FREESHIP': { type: 'freeship', value: 0, name: 'FREE SHIPPING' }
            };

            if (promos[code]) {
                activePromo = promos[code];
                promoStatusMsg.textContent = currentLang === 'th' ?
                    `ใช้คูปองส่วนลด "${activePromo.name}" สำเร็จ!` :
                    `Promo code "${activePromo.name}" applied successfully!`;
                promoStatusMsg.classList.add('success');
                calculateCheckoutPrices();
            } else {
                activePromo = null;
                promoStatusMsg.textContent = currentLang === 'th' ? 'รหัสโปรโมชันไม่ถูกต้อง' : 'Invalid promo code';
                promoStatusMsg.classList.add('error');
                calculateCheckoutPrices();
            }
        });
    }

    // Clickable Coupon Badges in Checkout Form
    const couponBadges = document.querySelectorAll('.coupon-badge-item');
    couponBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            if (promoCodeInput) {
                promoCodeInput.value = badge.dataset.code;
                if (applyPromoBtn) {
                    applyPromoBtn.click();
                }
            }
        });
    });

    // Submit checkout Details and Place Order
    if (checkoutDetailsForm) {
        checkoutDetailsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Security: Sanitize inputs to prevent stored XSS attacks
            const safeName = escapeHTML(document.getElementById('checkoutFullName').value.trim());
            const safePhone = escapeHTML(document.getElementById('checkoutPhone').value.trim());
            const safeAddress = escapeHTML(document.getElementById('checkoutAddress').value.trim());

            const activeCard = document.querySelector('.payment-card.active');
            const method = activeCard ? activeCard.dataset.method : 'credit-card';

            const methodNames = {
                'credit-card': currentLang === 'th' ? 'บัตรเครดิต' : 'Credit Card',
                'promptpay': 'PromptPay QR',
                'bank-transfer': currentLang === 'th' ? 'โอนผ่านบัญชีธนาคาร' : 'Bank Transfer',
                'line-pay': 'Rabbit LINE Pay'
            };

            const orderId = `NEKO-${Math.floor(100000 + Math.random() * 900000)}`;
            orderIdVal.textContent = orderId;

            const calc = calculateCheckoutPrices();
            const timestamp = new Date().toLocaleDateString(currentLang === 'th' ? 'th-TH' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // Save order metadata securely
            orders.unshift({
                id: orderId,
                time: timestamp,
                buyer: safeName,
                phone: safePhone,
                address: safeAddress,
                payment_method: methodNames[method],
                items: cart.map(item => {
                    const prod = products.find(p => p.id === item.id);
                    const activePrice = prod ? (currentLang === 'th' ? prod.price_th : prod.price_en) : item.price;
                    return { name: item.name, qty: item.qty, price: activePrice };
                }),
                discount_code: activePromo ? activePromo.name : null,
                discount_amount: calc.discountVal,
                shipping_fee: calc.shippingFee,
                total: calc.grandTotal,
                currency: currentLang === 'th' ? '฿' : '$'
            });

            localStorage.setItem('neko_orders', JSON.stringify(orders));

            // Hide checkout modal and clear variables
            checkoutDetailsModal.classList.remove('active');
            clearInterval(qrTimerInterval);
            checkoutDetailsForm.reset();

            // Display Checkout Success
            checkoutModal.classList.add('active');

            cart = [];
            updateCartUI();
            renderAdminDashboard();
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
        });
    }

    /* ==========================================================================
       LANGUAGE TOGGLING UTILITY (i18n Engine)
       ========================================================================== */
    const setLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('neko_lang', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput) {
            emailInput.placeholder = lang === 'th' ? 'ใส่อีเมลของคุณ' : 'Enter your email';
        }

        renderShopProducts();
        recalculateCalories();
        if (currentQuizStep === 'result') {
            calculateQuizResult();
        }
        updateCartUI();
        renderAdminDashboard();
        updateAuthUIVisibility();
    };

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });

    /* ==========================================================================
       DYNAMIC NUTRITION CALCULATOR
       ========================================================================== */
    const weightInput = document.getElementById('weightInput');
    const weightVal = document.getElementById('weightVal');
    const caloriesVal = document.getElementById('caloriesVal');
    const recipeMatch = document.getElementById('recipeMatch');
    const calcTip = document.getElementById('calcTip');
    const activityButtons = document.querySelectorAll('.activity-btn');

    let activeFactor = 1.2;

    const recalculateCalories = () => {
        if (!weightInput) return;

        const weight = parseFloat(weightInput.value);
        weightVal.textContent = `${weight.toFixed(1)} ${currentLang === 'th' ? 'กก. (kg)' : 'kg'}`;

        const rer = 70 * Math.pow(weight, 0.75);
        const totalCalories = Math.round(rer * activeFactor);
        caloriesVal.textContent = `${totalCalories} kcal`;

        let recommendedId = 'dry-raw';
        let portionTip = '';

        if (totalCalories < 190) {
            recommendedId = 'velvet-wet';
            const grams = Math.round(totalCalories / 1.1); // approx kcal density
            portionTip = currentLang === 'th' ?
                `ปริมาณที่แนะนำ: ให้ประมาณ ${grams} กรัมต่อวัน ของสูตรเปียกปลาแซลมอนและทูน่า` :
                `Portion recommendation: Feed approx. ${grams}g of Wellness CORE wet salmon shreds daily.`;
        } else if (totalCalories >= 190 && totalCalories <= 320) {
            recommendedId = 'salmon-bites';
            const grams = Math.round(totalCalories / 4.6);
            portionTip = currentLang === 'th' ?
                `ปริมาณที่แนะนำ: ให้ประมาณ ${grams} กรัมต่อวัน ของสูตรไก่และแกะฟรีซดราย` :
                `Portion recommendation: Feed approx. ${grams}g of Feline Natural Freeze-Dried daily.`;
        } else {
            recommendedId = 'dry-raw';
            const grams = Math.round(totalCalories / 3.8);
            portionTip = currentLang === 'th' ?
                `ปริมาณที่แนะนำ: ให้ประมาณ ${grams} กรัมต่อวัน ของสูตรเม็ดอบแห้งแกะนิวซีแลนด์` :
                `Portion recommendation: Feed approx. ${grams}g of Ziwi Peak Lamb air-dried daily.`;
        }

        const targetProd = products.find(p => p.id === recommendedId) || products[0];
        const dispName = currentLang === 'th' ? targetProd.name_th : targetProd.name_en;
        recipeMatch.textContent = escapeHTML(dispName);
        calcTip.textContent = portionTip;
    };

    if (weightInput) weightInput.addEventListener('input', recalculateCalories);

    activityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFactor = parseFloat(btn.dataset.factor);
            recalculateCalories();
        });
    });

    /* ==========================================================================
       RECIPE FINDER WIZARD LOGIC
       ========================================================================== */
    let quizAnswers = { age: '', texture: '', goal: '' };
    let currentQuizStep = 1;

    const quizProgressBar = document.getElementById('quizProgress');
    const quizPrevButtons = document.querySelectorAll('.quiz-prev');
    const addMatchedBtn = document.getElementById('addMatchedBtn');
    const quizReset = document.getElementById('quizReset');

    const showQuizStep = (step) => {
        document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));

        let stepEl;
        if (step === 'result') {
            stepEl = document.getElementById('stepResult');
            quizProgressBar.style.width = '100%';
        } else {
            stepEl = document.getElementById(`step${step}`);
            const percent = step === 1 ? 33 : step === 2 ? 66 : 90;
            quizProgressBar.style.width = `${percent}%`;
        }

        if (stepEl) stepEl.classList.add('active');
        currentQuizStep = step;
    };

    document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            const val = btn.dataset.value;

            btn.parentElement.querySelectorAll('.quiz-opt-btn').forEach(el => el.classList.remove('selected'));
            btn.classList.add('selected');

            quizAnswers[key] = val;

            if (currentQuizStep === 1) {
                showQuizStep(2);
            } else if (currentQuizStep === 2) {
                showQuizStep(3);
            } else if (currentQuizStep === 3) {
                calculateQuizResult();
                showQuizStep('result');
            }
        });
    });

    quizPrevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentQuizStep === 2) {
                showQuizStep(1);
            } else if (currentQuizStep === 3) {
                showQuizStep(2);
            }
        });
    });

    const calculateQuizResult = () => {
        const texture = quizAnswers.texture || 'dry';
        const goal = quizAnswers.goal || 'digestion';
        const age = quizAnswers.age || 'adult';

        let targetId = 'dry-raw';
        if (texture === 'wet') targetId = 'velvet-wet';
        if (texture === 'treats') targetId = 'salmon-bites';

        const matchedItem = products.find(p => p.id === targetId) || products[0];

        const matchName = currentLang === 'th' ? matchedItem.name_th : matchedItem.name_en;
        const matchDesc = currentLang === 'th' ? matchedItem.desc_th : matchedItem.desc_en;
        const matchPrice = currentLang === 'th' ? matchedItem.price_th : matchedItem.price_en;
        const curSymbol = currentLang === 'th' ? '฿' : '$';

        document.getElementById('matchedProductTitle').textContent = escapeHTML(matchName);
        document.getElementById('matchedProductDesc').textContent = escapeHTML(matchDesc);
        document.getElementById('matchedProductPrice').textContent = `${curSymbol}${matchPrice.toLocaleString()}`;

        const rules = {
            th: {
                kitten: 'คัดสรรระดับคุณค่าสารอาหารโปรตีนบริสุทธิ์เพื่อรองรับร่างกายและสมองของลูกแมวที่กำลังเจริญเติบโต',
                adult: 'พลังงานสมดุลเพื่อกิจกรรมในแต่ละวันพร้อมคงความฟิตของมวลกล้ามเนื้อและสัดส่วน',
                senior: 'สารอาหารย่อยง่ายถนอมไตและมีสารบำรุงข้อต่อกระดูกสำหรับน้องแมววัยเก๋า',
                dry: 'เม็ดเกรดพรีเมียมมีโครงสร้างที่ช่วยขัดถูและรักษาสุขภาพเหงือกและฟัน',
                wet: 'ความชุ่มชื้นสูงถนอมระบบปัสสาวะ ป้องกันนิ่วและช่วยเติมน้ำให้ร่างกาย',
                treats: 'สูตรโปรตีนสดใหม่ไร้แป้ง เพื่อคุณภาพของสารอาหารสดและเป็นธรรมชาติสูงสุด',
                digestion: 'มี Prebiotic ปรับสมดุลทางเดินอาหารและขับก้อนขนออกทางอุจจาระได้ง่าย',
                skin: 'บำรุงลึกถึงรูขุมขนด้วยโอเมก้าและแร่ธาตุจำเป็นลดอาการขนร่วง',
                weight: 'สูตรคงสมดุลพลังงานและไขมันส่วนเกินป้องกันแมวเลี้ยงในบ้านอ้วนง่าย'
            },
            en: {
                kitten: 'Tailored protein and amino profile supporting growth and brain development.',
                adult: 'Steady calorie matching to support everyday activity of adult felines.',
                senior: 'Gentle digestion with specialized joint care adjustments for aging senior cats.',
                dry: 'Premium air-dried particles provide natural teeth cleaning benefits.',
                wet: 'High hydration density protecting kidney systems and reducing crystals.',
                treats: 'Zero grain filler raw lockups, matching wild feline evolutionary standards.',
                digestion: 'Prebiotics to assist comfortable digestive processes and easy hairball passage.',
                skin: 'Fatty acids profile working to restore skin moisture and reduce shedding.',
                weight: 'Enriched fibers and L-carnitine to prevent excessive body fat accumulations.'
            }
        };

        const listHTML = `
            <li>${rules[currentLang][age] || ''}</li>
            <li>${rules[currentLang][texture] || ''}</li>
            <li>${rules[currentLang][goal] || ''}</li>
        `;

        document.getElementById('reasonList').innerHTML = listHTML;

        addMatchedBtn.dataset.id = matchedItem.id;
        addMatchedBtn.dataset.name = matchName;
        addMatchedBtn.dataset.price = matchPrice;
    };

    if (addMatchedBtn) {
        addMatchedBtn.addEventListener('click', () => {
            const { id, name, price } = addMatchedBtn.dataset;
            addToCart(id, name, price);
        });
    }

    if (quizReset) {
        quizReset.addEventListener('click', () => {
            quizAnswers = { age: '', texture: '', goal: '' };
            document.querySelectorAll('.quiz-opt-btn').forEach(btn => btn.classList.remove('selected'));
            showQuizStep(1);
        });
    }

    /* ==========================================================================
       FAQ ACCORDIONS TRIGGER
       ========================================================================== */
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const panel = trigger.nextElementSibling;

            faqTriggers.forEach(t => {
                if (t !== trigger) {
                    t.setAttribute('aria-expanded', 'false');
                    t.nextElementSibling.style.maxHeight = null;
                }
            });

            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = null;
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       NEWSLETTER SUBMISSION
       ========================================================================== */
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterStatus = document.getElementById('newsletterStatus');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterEmail.value.trim();
            if (email) {
                newsletterStatus.innerHTML = currentLang === 'th' ?
                    'สำเร็จ! สมัครสมาชิกแล้ว ใช้โค้ด <strong>WELCOME10</strong> เพื่อรับส่วนลด 10%' :
                    'Success! Join complete, use code <strong>WELCOME10</strong> for 10% off!';
                newsletterStatus.className = 'newsletter-status success';
                newsletterEmail.value = '';

                showNotification(currentLang === 'th' ?
                    'ยินดีต้อนรับ! คุณได้รับโค้ดส่วนลด WELCOME10' :
                    'Welcome! You received promo code WELCOME10'
                );

                setTimeout(() => {
                    newsletterStatus.textContent = '';
                }, 8000);
            }
        });
    }

    /* ==========================================================================
       SCROLL HEADER DETECTION & MOBILE MENU
       ========================================================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    /* ==========================================================================
       AUTHENTICATION MODAL LOGIC (LOGIN / REGISTER TABS)
       ========================================================================== */
    const navLoginBtn = document.getElementById('navLoginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const authModal = document.getElementById('authModal');
    const closeAuthBtn = document.getElementById('closeAuthBtn');

    const authTabLogin = document.getElementById('authTabLogin');
    const authTabRegister = document.getElementById('authTabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    const loginErrorMsg = document.getElementById('loginErrorMsg');
    const registerErrorMsg = document.getElementById('registerErrorMsg');
    const registerSuccessMsg = document.getElementById('registerSuccessMsg');

    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    const adminDrawer = document.getElementById('adminDrawer');
    const adminOverlay = document.getElementById('adminOverlay');
    const adminClose = document.getElementById('adminClose');
    const navAdminDashboard = document.getElementById('navAdminDashboard');
    const mobileAdminDashboard = document.getElementById('mobileAdminDashboard');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    const switchAuthTab = (tab) => {
        document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.auth-form-panel').forEach(p => p.classList.remove('active'));

        loginErrorMsg.style.display = 'none';
        registerErrorMsg.style.display = 'none';
        registerSuccessMsg.style.display = 'none';

        if (tab === 'login') {
            authTabLogin.classList.add('active');
            loginForm.classList.add('active');
        } else {
            authTabRegister.classList.add('active');
            registerForm.classList.add('active');
        }
    };

    if (authTabLogin) authTabLogin.addEventListener('click', () => switchAuthTab('login'));
    if (authTabRegister) authTabRegister.addEventListener('click', () => switchAuthTab('register'));

    const openAuthModal = (e) => {
        if (e) e.preventDefault();
        authModal.classList.add('active');
        switchAuthTab('login');
        loginForm.reset();
        registerForm.reset();
    };

    const closeAuthModal = () => {
        authModal.classList.remove('active');
    };

    if (navLoginBtn) navLoginBtn.addEventListener('click', openAuthModal);
    if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', openAuthModal);
    if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuthModal);

    const updateAuthUIVisibility = () => {
        const userBadge = document.getElementById('userBadgeContainer');
        const userGreet = document.getElementById('userGreetingText');
        const mobileUserBadge = document.getElementById('mobileUserStatus');
        const mobileGreet = document.getElementById('mobileGreetingText');

        const loginBtns = [navLoginBtn, mobileLoginBtn];
        const adminLinks = document.querySelectorAll('.admin-dashboard-link');

        if (activeUser) {
            loginBtns.forEach(btn => { if (btn) btn.style.display = 'none'; });
            const safeUsername = escapeHTML(activeUser.username);

            if (userBadge) {
                userBadge.style.display = 'flex';
                userGreet.textContent = `${currentLang === 'th' ? 'สวัสดีคุณ' : 'Hi,'} ${safeUsername}`;
            }
            if (mobileUserBadge) {
                mobileUserBadge.style.display = 'block';
                mobileGreet.textContent = `${currentLang === 'th' ? 'สวัสดีคุณ' : 'Hi,'} ${safeUsername}`;
            }

            if (activeUser.role === 'admin') {
                adminLinks.forEach(link => { if (link) link.style.display = 'block'; });
            } else {
                adminLinks.forEach(link => { if (link) link.style.display = 'none'; });
            }
        } else {
            loginBtns.forEach(btn => { if (btn) btn.style.display = 'block'; });
            if (userBadge) userBadge.style.display = 'none';
            if (mobileUserBadge) mobileUserBadge.style.display = 'none';
            adminLinks.forEach(link => { if (link) link.style.display = 'none'; });
        }
    };

    const handleLogout = () => {
        activeUser = null;
        sessionStorage.removeItem('neko_active_user');
        updateAuthUIVisibility();
        closeAdminDrawer();
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);
    if (adminLogoutBtn) adminLogoutBtn.addEventListener('click', handleLogout);

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('regUsername').value.trim();
            const passwordInput = document.getElementById('regPassword').value;
            const confirmPasswordInput = document.getElementById('regConfirmPassword').value;

            registerErrorMsg.style.display = 'none';
            registerSuccessMsg.style.display = 'none';

            const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
            if (!usernameRegex.test(usernameInput)) {
                registerErrorMsg.textContent = currentLang === 'th' ?
                    'ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษ ตัวเลข หรือขีดล่าง (_) ความยาว 3-15 ตัวเท่านั้น' :
                    'Username must be alphanumeric or underscores, 3-15 characters.';
                registerErrorMsg.style.display = 'block';
                return;
            }

            // Enhanced Security: Alphanumeric complexity check
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
            if (!passwordRegex.test(passwordInput)) {
                registerErrorMsg.textContent = currentLang === 'th' ?
                    'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z) ตัวพิมพ์เล็ก (a-z) และตัวเลข (0-9) อย่างละ 1 ตัว' :
                    'Password must be at least 6 characters and include at least one uppercase, one lowercase, and one number.';
                registerErrorMsg.style.display = 'block';
                return;
            }

            if (passwordInput !== confirmPasswordInput) {
                registerErrorMsg.textContent = currentLang === 'th' ?
                    'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน' :
                    'Passwords do not match.';
                registerErrorMsg.style.display = 'block';
                return;
            }

            const isDuplicate = users.some(u => u.username.toLowerCase() === usernameInput.toLowerCase());
            if (isDuplicate) {
                registerErrorMsg.textContent = currentLang === 'th' ?
                    'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว' :
                    'Username is already taken.';
                registerErrorMsg.style.display = 'block';
                return;
            }

            users.push({
                username: usernameInput,
                password: passwordInput,
                role: 'user'
            });
            saveUsersToStorage();

            registerSuccessMsg.textContent = currentLang === 'th' ?
                'สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ' :
                'Registration successful! Please login.';
            registerSuccessMsg.style.display = 'block';
            registerForm.reset();

            setTimeout(() => {
                switchAuthTab('login');
                document.getElementById('loginUsername').value = usernameInput;
            }, 1500);
        });
    }

    let loginAttempts = parseInt(sessionStorage.getItem('login_attempts') || '0');
    let lockoutUntil = parseInt(sessionStorage.getItem('lockout_until') || '0');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Lockout security validator
            const now = Date.now();
            if (lockoutUntil && now < lockoutUntil) {
                const secondsLeft = Math.round((lockoutUntil - now) / 1000);
                loginErrorMsg.textContent = currentLang === 'th' ?
                    `บัญชีถูกระงับชั่วคราวชั่วครู่จากการใส่รหัสผ่านผิดซ้ำ โปรดลองอีกครั้งในอีก ${secondsLeft} วินาที` :
                    `Too many failed attempts. Try again in ${secondsLeft} seconds.`;
                loginErrorMsg.style.display = 'block';
                return;
            }

            const usernameInput = document.getElementById('loginUsername').value.trim();
            const passwordInput = document.getElementById('loginPassword').value;

            loginErrorMsg.style.display = 'none';

            const matchedUser = users.find(u =>
                u.username.toLowerCase() === usernameInput.toLowerCase() &&
                u.password === passwordInput
            );

            if (matchedUser) {
                loginAttempts = 0;
                sessionStorage.setItem('login_attempts', '0');
                sessionStorage.removeItem('lockout_until');

                activeUser = matchedUser;
                sessionStorage.setItem('neko_active_user', JSON.stringify(matchedUser));
                updateAuthUIVisibility();
                closeAuthModal();
                updateCartUI();
                showNotification(currentLang === 'th' ? `ยินดีต้อนรับกลับมา คุณ ${activeUser.username}!` : `Welcome back, ${activeUser.username}!`);
            } else {
                loginAttempts++;
                sessionStorage.setItem('login_attempts', loginAttempts.toString());

                if (loginAttempts >= 3) {
                    const lockoutTime = Date.now() + 30000; // 30 seconds
                    lockoutUntil = lockoutTime;
                    sessionStorage.setItem('lockout_until', lockoutTime.toString());
                    loginErrorMsg.textContent = currentLang === 'th' ?
                        'ป้อนรหัสผิดครบ 3 ครั้ง ระบบล็อก 30 วินาทีเพื่อความปลอดภัย' :
                        'Failed 3 times. Locked for 30 seconds for security.';
                } else {
                    loginErrorMsg.textContent = currentLang === 'th' ?
                        `ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (ครั้งที่ ${loginAttempts}/3)` :
                        `Invalid username or password (Attempt ${loginAttempts}/3)`;
                }
                loginErrorMsg.style.display = 'block';
            }
        });
    }

    // Social Login Click Handlers with Dynamic spinner connection UI
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.classList.contains('google-btn') ? 'Google' :
                btn.classList.contains('facebook-btn') ? 'Facebook' :
                    btn.classList.contains('line-btn') ? 'Line' : 'Email';

            if (lockoutUntil && Date.now() < lockoutUntil) {
                showNotification(currentLang === 'th' ? 'ระบบความปลอดภัยระงับการล็อกอินขณะนี้' : 'Security lockout active.', 'error');
                return;
            }

            const origHTML = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner"></span> <span>Connecting...</span>`;

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = origHTML;

                const randomId = Math.floor(1000 + Math.random() * 9000);
                const mockUsername = `${platform}_User_${randomId}`;

                activeUser = {
                    username: mockUsername,
                    password: '',
                    role: 'user'
                };

                sessionStorage.setItem('neko_active_user', JSON.stringify(activeUser));
                updateAuthUIVisibility();
                closeAuthModal();
                updateCartUI();

                showNotification(currentLang === 'th' ?
                    `เข้าสู่ระบบสำเร็จผ่านบัญชี ${platform} (${mockUsername})` :
                    `Logged in successfully via ${platform} (${mockUsername})`
                );
            }, 1000);
        });
    });

    const openAdminDrawer = (e) => {
        if (e) e.preventDefault();
        adminDrawer.classList.add('active');
        adminOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderAdminDashboard();
    };

    const closeAdminDrawer = () => {
        adminDrawer.classList.remove('active');
        adminOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    const dbLinks = [navAdminDashboard, mobileAdminDashboard];
    dbLinks.forEach(link => {
        if (link) link.addEventListener('click', openAdminDrawer);
    });

    if (adminClose) adminClose.addEventListener('click', closeAdminDrawer);
    if (adminOverlay) adminOverlay.addEventListener('click', closeAdminDrawer);


    /* ==========================================================================
       ADMIN CONTROL PANEL LOGIC (CRUD & ORDERS)
       ========================================================================== */
    const adminProductsTableBody = document.getElementById('adminProductsTableBody');
    const adminProductForm = document.getElementById('adminProductForm');
    const editProductId = document.getElementById('editProductId');
    const prodNameTh = document.getElementById('prodNameTh');
    const prodNameEn = document.getElementById('prodNameEn');
    const prodPriceTh = document.getElementById('prodPriceTh');
    const prodPriceEn = document.getElementById('prodPriceEn');
    const prodType = document.getElementById('prodType');
    const prodDescTh = document.getElementById('prodDescTh');
    const prodDescEn = document.getElementById('prodDescEn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const productFormTitle = document.getElementById('productFormTitle');
    const totalProductsCount = document.getElementById('totalProductsCount');
    const totalSalesRevenue = document.getElementById('totalSalesRevenue');
    const adminOrdersList = document.getElementById('adminOrdersList');

    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        });
    });

    const renderAdminDashboard = () => {
        const tabBtnProducts = document.getElementById('tabBtnProducts');
        const tabBtnOrders = document.getElementById('tabBtnOrders');

        if (tabBtnProducts) tabBtnProducts.textContent = `${currentLang === 'th' ? 'สินค้าทั้งหมด' : 'Products'} (${products.length})`;
        if (tabBtnOrders) tabBtnOrders.textContent = `${currentLang === 'th' ? 'ใบสั่งซื้อสินค้า' : 'Orders'} (${orders.length})`;

        if (totalProductsCount) totalProductsCount.textContent = products.length;

        const sumSales = orders.reduce((sum, o) => {
            const value = o.currency === '$' ? parseFloat(o.total) * 33 : parseFloat(o.total);
            return sum + value;
        }, 0);

        if (totalSalesRevenue) {
            totalSalesRevenue.textContent = currentLang === 'th' ?
                `฿${sumSales.toLocaleString()}` :
                `$${Math.round(sumSales / 33).toLocaleString()}`;
        }

        if (adminProductsTableBody) {
            adminProductsTableBody.innerHTML = '';
            products.forEach(p => {
                const tr = document.createElement('tr');
                const nameTh = escapeHTML(p.name_th);
                const nameEn = escapeHTML(p.name_en);

                tr.innerHTML = `
                    <td>
                        <strong>${nameTh}</strong><br>
                        <span style="font-size:0.75rem;color:var(--text-secondary);">${nameEn}</span>
                    </td>
                    <td>฿${p.price_th} / $${p.price_en}</td>
                    <td class="admin-table-actions">
                        <button class="admin-action-btn edit" data-id="${p.id}">${currentLang === 'th' ? 'แก้ไข' : 'Edit'}</button>
                        <button class="admin-action-btn delete" data-id="${p.id}">${currentLang === 'th' ? 'ลบ' : 'Delete'}</button>
                    </td>
                `;

                tr.querySelector('.edit').addEventListener('click', () => populateProductForm(p));
                tr.querySelector('.delete').addEventListener('click', () => deleteProduct(p.id));

                adminProductsTableBody.appendChild(tr);
            });
        }

        if (adminOrdersList) {
            if (orders.length === 0) {
                adminOrdersList.innerHTML = `<div class="empty-orders-msg">${currentLang === 'th' ? 'ยังไม่มีคำสั่งซื้อที่ส่งเข้ามาในขณะนี้' : 'No simulated orders received yet.'}</div>`;
            } else {
                adminOrdersList.innerHTML = '';
                orders.forEach(o => {
                    const card = document.createElement('div');
                    card.className = 'admin-order-card';

                    let itemsHtml = '';
                    o.items.forEach(item => {
                        itemsHtml += `<li><span>${escapeHTML(item.name)} x${item.qty}</span> <span>${o.currency}${item.price.toLocaleString()}</span></li>`;
                    });

                    const safeBuyer = escapeHTML(o.buyer);
                    const safeId = escapeHTML(o.id);
                    const safeTime = escapeHTML(o.time);
                    const safePhone = o.phone ? escapeHTML(o.phone) : '-';
                    const safeAddress = o.address ? escapeHTML(o.address) : '-';
                    const safePayMethod = o.payment_method ? escapeHTML(o.payment_method) : (currentLang === 'th' ? 'ไม่ได้ระบุ' : 'Not specified');
                    const discountText = o.discount_code ? ` (ส่วนลดโค้ด ${escapeHTML(o.discount_code)})` : '';

                    card.innerHTML = `
                        <div class="order-card-header">
                            <div>
                                <span class="order-ref">${safeId}</span>
                                <span style="font-size:0.75rem;color:var(--text-secondary);margin-left:8px;">โดย: ${safeBuyer}</span>
                            </div>
                            <span class="order-time">${safeTime}</span>
                        </div>
                        <div class="order-shipping-meta" style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:12px;border-bottom:1px solid var(--border-color);padding-bottom:8px;">
                            <strong>เบอร์โทร:</strong> ${safePhone}<br>
                            <strong>ที่อยู่จัดส่ง:</strong> ${safeAddress}<br>
                            <strong>ชำระด้วย:</strong> ${safePayMethod}
                        </div>
                        <ul class="order-items-list">
                            ${itemsHtml}
                        </ul>
                        <div class="order-total-row" style="margin-top:10px;">
                            <span>${currentLang === 'th' ? 'ราคารวมสุทธิ' : 'Total Net'}${discountText}</span>
                            <span class="order-total-price">${o.currency}${o.total.toLocaleString()}</span>
                        </div>
                    `;
                    adminOrdersList.appendChild(card);
                });
            }
        }
    };

    const populateProductForm = (p) => {
        editProductId.value = p.id;
        prodNameTh.value = p.name_th;
        prodNameEn.value = p.name_en;
        prodPriceTh.value = p.price_th;
        prodPriceEn.value = p.price_en;
        prodType.value = p.type;
        prodDescTh.value = p.desc_th;
        prodDescEn.value = p.desc_en;

        productFormTitle.textContent = currentLang === 'th' ? 'แก้ไขข้อมูลสินค้า' : 'Edit Product Details';
        cancelEditBtn.style.display = 'inline-block';
    };

    const resetProductForm = () => {
        editProductId.value = '';
        adminProductForm.reset();
        productFormTitle.textContent = currentLang === 'th' ? 'เพิ่มสินค้าใหม่' : 'Add New Product';
        cancelEditBtn.style.display = 'none';
    };

    if (cancelEditBtn) cancelEditBtn.addEventListener('click', resetProductForm);

    if (adminProductForm) {
        adminProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = editProductId.value;

            const nameTh = prodNameTh.value.trim();
            const nameEn = prodNameEn.value.trim();
            const priceTh = parseInt(prodPriceTh.value);
            const priceEn = parseInt(prodPriceEn.value);
            const type = prodType.value;
            const descTh = prodDescTh.value.trim();
            const descEn = prodDescEn.value.trim();

            if (id) {
                const index = products.findIndex(p => p.id === id);
                if (index !== -1) {
                    products[index] = {
                        ...products[index],
                        name_th: nameTh,
                        name_en: nameEn,
                        price_th: priceTh,
                        price_en: priceEn,
                        type: type,
                        desc_th: descTh,
                        desc_en: descEn
                    };
                }
            } else {
                const newId = `custom-${Date.now()}`;
                products.push({
                    id: newId,
                    type: type,
                    price_th: priceTh,
                    price_en: priceEn,
                    name_th: nameTh,
                    name_en: nameEn,
                    desc_th: descTh,
                    desc_en: descEn,
                    specs_th: [
                        { label: 'โปรตีน', value: type === 'dry-raw' ? '45% Min' : type === 'velvet-wet' ? '12% Min' : '75% Min' },
                        { label: 'รูปแบบ', value: type === 'dry-raw' ? 'เม็ดผสมฟรีซดราย' : type === 'velvet-wet' ? 'เนื้อบดละเอียด (Pate)' : 'ชิ้นอบแห้งเยือกแข็ง' }
                    ],
                    specs_en: [
                        { label: 'Protein', value: type === 'dry-raw' ? '45% Min' : type === 'velvet-wet' ? '12% Min' : '75% Min' },
                        { label: 'Form', value: type === 'dry-raw' ? 'Freeze-Dried Mix' : type === 'velvet-wet' ? 'Smooth Pate' : 'Single Raw Ingredient' }
                    ]
                });
            }

            saveProductsToStorage();
            resetProductForm();
            renderAdminDashboard();
            renderShopProducts();
            recalculateCalories();
        });
    }

    const deleteProduct = (id) => {
        if (confirm(currentLang === 'th' ? 'คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?' : 'Are you sure you want to delete this product?')) {
            products = products.filter(p => p.id !== id);
            saveProductsToStorage();
            cart = cart.filter(item => item.id !== id);

            renderAdminDashboard();
            renderShopProducts();
            recalculateCalories();
            updateCartUI();
        }
    };


    /* ==========================================================================
       FLASH SALE COUNTDOWN TIMER
       ========================================================================== */
    const initFlashSaleTimer = () => {
        const timerEl = document.getElementById('flashSaleTimer');
        if (!timerEl) return;

        // Set or load dynamic flash sale end time (stores in localStorage to survive refresh)
        let saleEndTime = localStorage.getItem('neko_flash_sale_end');
        if (!saleEndTime || parseInt(saleEndTime) < Date.now()) {
            // Set 2 hours and 45 minutes from now
            saleEndTime = Date.now() + 2 * 60 * 60 * 1000 + 45 * 60 * 1000;
            localStorage.setItem('neko_flash_sale_end', saleEndTime.toString());
        }

        const updateClock = () => {
            const now = Date.now();
            const diff = parseInt(saleEndTime) - now;

            if (diff <= 0) {
                // Restart timer
                const newEndTime = Date.now() + 2 * 60 * 60 * 1000;
                localStorage.setItem('neko_flash_sale_end', newEndTime.toString());
                saleEndTime = newEndTime;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const hh = hours < 10 ? '0' + hours : hours;
            const mm = minutes < 10 ? '0' + minutes : minutes;
            const ss = seconds < 10 ? '0' + seconds : seconds;

            timerEl.textContent = `${hh}:${mm}:${ss}`;
        };

        updateClock();
        setInterval(updateClock, 1000);
    };

    /* ==========================================================================
       INITIAL RUN
       ========================================================================== */
    setLanguage(currentLang);
    updateAuthUIVisibility();
    initFlashSaleTimer();
});
