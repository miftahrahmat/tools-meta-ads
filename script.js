document.addEventListener('DOMContentLoaded', () => {

    // Tab functionality
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tool-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            contents.forEach(item => item.classList.remove('active'));

            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.tab);
            target.classList.add('active');
        });
    });

    // UTM Generator
    const utmInputs = document.querySelectorAll('#utm-builder input');
    const finalUrlTextarea = document.getElementById('final-url');
    const copyUrlBtn = document.getElementById('copy-url-btn');

    const generateUtmUrl = () => {
        const baseUrl = document.getElementById('base-url').value.trim();
        if (!baseUrl) {
            finalUrlTextarea.value = 'Silakan masukkan URL Asli terlebih dahulu.';
            return;
        }

        const params = new URLSearchParams();
        const source = document.getElementById('utm-source').value.trim();
        const medium = document.getElementById('utm-medium').value.trim();
        const campaign = document.getElementById('utm-campaign').value.trim();
        const term = document.getElementById('utm-term').value.trim();
        const content = document.getElementById('utm-content').value.trim();

        if (source) params.append('utm_source', source);
        if (medium) params.append('utm_medium', medium);
        if (campaign) params.append('utm_campaign', campaign);
        if (term) params.append('utm_term', term);
        if (content) params.append('utm_content', content);
        
        const queryString = params.toString();
        if (queryString) {
            finalUrlTextarea.value = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}`;
        } else {
            finalUrlTextarea.value = baseUrl;
        }
    };

    utmInputs.forEach(input => input.addEventListener('input', generateUtmUrl));
    generateUtmUrl(); // Initial call

    copyUrlBtn.addEventListener('click', () => {
        finalUrlTextarea.select();
        document.execCommand('copy');
        copyUrlBtn.textContent = 'Berhasil Disalin!';
        setTimeout(() => {
            copyUrlBtn.textContent = 'Salin ke Clipboard';
        }, 2000);
    });

    // Ad Copy Generator
    const generateCopyBtn = document.getElementById('generate-copy-btn');
    const headlineIdea = document.getElementById('headline-idea');
    const primaryTextIdea = document.getElementById('primary-text-idea');
    
    const copyData = {
        hooks: ["Stop scroll dulu!", "Rahasia terungkap...", "Capek dengan [Masalah]?", "Satu-satunya [Produk] yang Anda butuhkan.", "Diskon Terbatas!", "Baru! Telah Hadir..."],
        benefits: ["menghemat waktu Anda", "meningkatkan omzet hingga 200%", "membuat hidup lebih mudah", "solusi praktis untuk [Masalah]", "hasil yang terbukti nyata", "kualitas premium dengan harga terjangkau"],
        features: ["Dibuat dari bahan terbaik", "Dengan teknologi AI canggih", "Desain elegan dan modern", "Mudah digunakan oleh siapa saja", "Garansi uang kembali"],
        ctas: ["Klik link di bio sekarang!", "Pesan sekarang juga!", "Dapatkan penawaran spesial di sini.", "Download e-book gratis kami.", "Belanja sekarang sebelum kehabisan!"]
    };

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const generateAdCopy = () => {
        const headline = `${getRandomItem(copyData.hooks)} Dapatkan [Produk/Solusi Anda]!`;
        const primaryText = `Anda ingin ${getRandomItem(copyData.benefits)}? \n\nProduk kami hadir untuk Anda! ${getRandomItem(copyData.features)}. Jangan lewatkan kesempatan ini. \n\n${getRandomItem(copyData.ctas)}`;
        
        headlineIdea.innerText = headline.replace('[Produk/Solusi Anda]', 'Solusi Terbaik');
        primaryTextIdea.innerText = primaryText.replace('[Masalah]', 'masalah lama');
    };

    generateCopyBtn.addEventListener('click', generateAdCopy);
    generateAdCopy(); // Initial call

    // Metrics Calculator
    const calculatorInputs = document.querySelectorAll('#metrics-calculator input');

    const calculateMetrics = () => {
        // CTR
        const ctrClicks = parseFloat(document.getElementById('ctr-clicks').value) || 0;
        const ctrImpressions = parseFloat(document.getElementById('ctr-impressions').value) || 0;
        const ctrResult = document.getElementById('ctr-result');
        if (ctrClicks > 0 && ctrImpressions > 0) {
            ctrResult.textContent = `${((ctrClicks / ctrImpressions) * 100).toFixed(2)}%`;
        } else {
            ctrResult.textContent = '-';
        }

        // CPC
        const cpcCost = parseFloat(document.getElementById('cpc-cost').value) || 0;
        const cpcClicks = parseFloat(document.getElementById('cpc-clicks').value) || 0;
        const cpcResult = document.getElementById('cpc-result');
        if (cpcCost > 0 && cpcClicks > 0) {
            cpcResult.textContent = `Rp ${Math.round(cpcCost / cpcClicks).toLocaleString('id-ID')}`;
        } else {
            cpcResult.textContent = '-';
        }

        // CPM
        const cpmCost = parseFloat(document.getElementById('cpm-cost').value) || 0;
        const cpmImpressions = parseFloat(document.getElementById('cpm-impressions').value) || 0;
        const cpmResult = document.getElementById('cpm-result');
        if (cpmCost > 0 && cpmImpressions > 0) {
            cpmResult.textContent = `Rp ${Math.round((cpmCost / cpmImpressions) * 1000).toLocaleString('id-ID')}`;
        } else {
            cpmResult.textContent = '-';
        }

        // ROAS
        const roasRevenue = parseFloat(document.getElementById('roas-revenue').value) || 0;
        const roasCost = parseFloat(document.getElementById('roas-cost').value) || 0;
        const roasResult = document.getElementById('roas-result');
        if (roasRevenue > 0 && roasCost > 0) {
            roasResult.textContent = `${(roasRevenue / roasCost).toFixed(2)}x`;
        } else {
            roasResult.textContent = '-';
        }
    };
    
    calculatorInputs.forEach(input => input.addEventListener('input', calculateMetrics));
});
