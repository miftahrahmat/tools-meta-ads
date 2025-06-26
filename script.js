document.addEventListener('DOMContentLoaded', () => {

    // --- Start of AI Copywriting Logic Engine ---
    const copywritingLibrary = {
        hooks: {
            question: ["Apakah Anda {audience} yang {pain}?", "Pernahkah Anda merasa {pain}?", "Bagaimana jika Anda bisa {usp}?", "Siap untuk mengubah cara Anda melihat {product}?"],
            direct: ["Stop scroll dan dengarkan.", "Ini yang Anda butuhkan.", "Untuk Anda, para {audience}.", "Perhatian, para {audience}!"],
            story: ["Dulu saya juga {pain}, sampai akhirnya...", "Setiap pagi, {audience} seperti Budi selalu...", "Ini kisah tentang bagaimana {product} mengubah segalanya."]
        },
        connectors: {
            professional: ["Oleh karena itu, kami mempersembahkan", "Memperkenalkan solusi definitiv", "Kini telah hadir jawaban atas kebutuhan Anda"],
            casual: ["Nah, makanya kami bikin", "Kenalin nih,", "Cekidot, ada yang baru nih,"],
            enthusiastic: ["Karena itulah kami SANGAT bersemangat memperkenalkan", "WOW! Akhirnya datang juga", "SIAP-SIAP, karena ini akan mengubah segalanya!"]
        },
        benefits: {
            professional: ["Anda akan mendapatkan kemampuan untuk {usp}.", "Memungkinkan Anda untuk {usp}.", "Memberikan hasil nyata dalam {usp}."],
            casual: ["Bikin kamu jadi bisa {usp}.", "Kamu bakal ngerasain gimana enaknya {usp}.", "Jadi gampang banget buat {usp}."],
            enthusiastic: ["RASAKAN sensasi luar biasa saat Anda bisa {usp}!", "DIJAMIN bikin kamu auto-{usp}!", "Siap untuk {usp} SEKARANG JUGA?"]
        },
        agitations: {
            professional: ["Jangan biarkan {pain} menghambat produktivitas Anda.", "Dampak dari {pain} bisa lebih besar dari yang Anda kira.", "Mengabaikan {pain} hanya akan menunda masalah."],
            casual: ["Gak enak kan, kalau {pain} terus-terusan?", "Capek banget gak sih kalau {pain}?", "Udah deh, jangan mau LAMA-LAMA sama {pain}."],
            enthusiastic: ["CUKUP SUDAH dengan {pain} yang menyiksa!", "Buang jauh-jauh {pain} dari hidupmu!", "Hancurkan {pain} SEKARANG!"]
        },
        credibility: ["Dipercaya oleh 10,000+ {audience}.", "Dirancang oleh para ahli di bidangnya.", "Pemenang penghargaan 'Best Solution 2025'.", "Diliput oleh media ternama.", "Berdasarkan riset bertahun-tahun."],
        urgency: {
            professional: ["Penawaran ini hanya berlaku untuk waktu yang terbatas.", "Slot tersedia sangat terbatas.", "Amankan posisi Anda sebelum kuota terpenuhi."],
            casual: ["Stoknya terbatas lho, jangan sampai keabisan.", "Promo ini gak bakal lama, sikattt!", "Cuma buat 100 orang pertama nih."],
            enthusiastic: ["HANYA HARI INI!", "KESEMPATAN EMAS INI TIDAK DATANG DUA KALI!", "SERBU SEKARANG JUGA!"]
        },
        emojis: {
            professional: ['➡️', '✅', '📈', '💼', '💡'],
            casual: ['😊', '👍', '☕', '😎', '👇'],
            enthusiastic: ['🔥', '🚀', '✨', '🎉', '💯']
        }
    };

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    function assembleCopy(parts) {
        let text = parts.hook ? `${parts.hook}\n\n` : '';
        if (parts.agitation) text += `${parts.agitation} `;
        if (parts.connector) text += `${parts.connector} ${parts.product}. `;
        if (parts.benefit) text += `${parts.benefit} `;
        if (parts.credibility) text += `\n\n${getRandomItem(parts.emojis)} ${parts.credibility} `;
        if (parts.urgency) text += `\n\n${getRandomItem(parts.emojis)} ${parts.urgency} `;
        text += `\n\n${parts.cta} ${getRandomItem(parts.emojis)}`;
        return text;
    }

    function generateAILogicCopy(inputs) {
        const { product, audience, usp, pain, cta, style, tone } = inputs;
        const lib = copywritingLibrary;
        const results = [];

        for (let i = 0; i < 2; i++) { // Generate 2 variations
            let headline = '';
            let primaryTextParts = { product, cta, emojis: lib.emojis[tone] };

            const replacePlaceholders = (str) => str.replace(/{product}/g, product).replace(/{audience}/g, audience).replace(/{usp}/g, usp).replace(/{pain}/g, pain);

            switch (style) {
                case 'soft-sell':
                case 'story':
                    headline = getRandomItem(lib.hooks.story);
                    primaryTextParts.hook = headline;
                    primaryTextParts.connector = getRandomItem(lib.connectors[tone]);
                    primaryTextParts.benefit = getRandomItem(lib.benefits[tone]);
                    if (Math.random() > 0.5) primaryTextParts.credibility = getRandomItem(lib.credibility);
                    break;
                case 'hard-sell':
                    headline = getRandomItem(lib.hooks.direct);
                    primaryTextParts.benefit = getRandomItem(lib.benefits[tone]);
                    primaryTextParts.urgency = getRandomItem(lib.urgency[tone]);
                    if (Math.random() > 0.5) primaryTextParts.credibility = getRandomItem(lib.credibility);
                    break;
                case 'pas':
                    headline = getRandomItem(lib.hooks.question);
                    primaryTextParts.hook = headline;
                    primaryTextParts.agitation = getRandomItem(lib.agitations[tone]);
                    primaryTextParts.connector = getRandomItem(lib.connectors[tone]);
                    primaryTextParts.benefit = getRandomItem(lib.benefits[tone]);
                    break;
            }
            
            const finalHeadline = replacePlaceholders(headline);
            const finalPrimaryText = replacePlaceholders(assembleCopy(primaryTextParts));

            results.push({ headline: finalHeadline, primaryText: finalPrimaryText });
        }
        return results;
    }
    // --- End of AI Copywriting Logic Engine ---

    // Tab functionality
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tool-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            contents.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Ad Copy Generator v3.0
    document.getElementById('generate-copy-btn')?.addEventListener('click', () => {
        const inputs = {
            product: document.getElementById('copy-product-name').value || "Produk Keren",
            audience: document.getElementById('copy-audience').value || "Anda",
            usp: document.getElementById('copy-usp').value || "membuat hidup lebih baik",
            pain: document.getElementById('copy-pain-point').value || "masalah sehari-hari",
            cta: document.getElementById('copy-cta').value || "Dapatkan Sekarang",
            style: document.getElementById('copy-style').value,
            tone: document.getElementById('copy-tone').value,
        };
        const results = generateAILogicCopy(inputs);
        renderResults(results);
    });

    function renderResults(results) {
        const resultsContainer = document.getElementById('ad-copy-results-v2');
        resultsContainer.innerHTML = '';
        if (!results || results.length === 0) return;

        let counter = 1;
        results.forEach(result => {
            const headlineId = `headline-${counter}`;
            const primaryTextId = `primary-text-${counter}`;
            const html = `
                <div class="copy-option">
                    <h4>Opsi Ad Copy ${counter}</h4>
                    <p><strong>Headline:</strong> <span id="${headlineId}">${result.headline}</span> <button class="copy-btn" data-target="${headlineId}">Salin</button></p>
                    <p><strong>Primary Text:</strong><br><span id="${primaryTextId}">${result.primaryText}</span></p>
                    <button class="copy-btn" data-target="${primaryTextId}">Salin Primary Text</button>
                </div>
            `;
            resultsContainer.innerHTML += html;
            counter++;
        });

        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', () => {
                const textToCopy = document.getElementById(button.dataset.target).innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    button.textContent = 'Tersalin!';
                    setTimeout(() => { button.textContent = 'Salin'; }, 1500);
                });
            });
        });
    }

    // --- UTM and Calculator Logic ---
    const utmInputs = document.querySelectorAll('#utm-builder input');
    const finalUrlTextarea = document.getElementById('final-url');
    const copyUrlBtn = document.getElementById('copy-url-btn');

    const generateUtmUrl = () => {
        const baseUrl = document.getElementById('base-url').value.trim();
        if (!baseUrl) {
            if(finalUrlTextarea) finalUrlTextarea.value = 'Silakan masukkan URL Asli terlebih dahulu.';
            return;
        }
        const params = new URLSearchParams();
        ['utm-source', 'utm-medium', 'utm-campaign', 'utm-term', 'utm-content'].forEach(id => {
            const el = document.getElementById(id);
            if (el && el.value.trim()) params.append(id.replace('-', '_'), el.value.trim());
        });
        const queryString = params.toString();
        finalUrlTextarea.value = queryString ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}` : baseUrl;
    };
    utmInputs.forEach(input => input.addEventListener('input', generateUtmUrl));
    if (document.getElementById('base-url')) generateUtmUrl();

    copyUrlBtn?.addEventListener('click', () => {
        finalUrlTextarea.select();
        document.execCommand('copy');
        copyUrlBtn.textContent = 'Berhasil Disalin!';
        setTimeout(() => { copyUrlBtn.textContent = 'Salin ke Clipboard'; }, 2000);
    });

    const calculatorInputs = document.querySelectorAll('#metrics-calculator input');
    const calculateMetrics = () => {
        const getVal = id => parseFloat(document.getElementById(id)?.value) || 0;
        const setResult = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };
        const ctrClicks = getVal('ctr-clicks'), ctrImpressions = getVal('ctr-impressions');
        setResult('ctr-result', ctrClicks > 0 && ctrImpressions > 0 ? `${((ctrClicks / ctrImpressions) * 100).toFixed(2)}%` : '-');
        const cpcCost = getVal('cpc-cost'), cpcClicks = getVal('cpc-clicks');
        setResult('cpc-result', cpcCost > 0 && cpcClicks > 0 ? `Rp ${Math.round(cpcCost / cpcClicks).toLocaleString('id-ID')}` : '-');
        const cpmCost = getVal('cpm-cost'), cpmImpressions = getVal('cpm-impressions');
        setResult('cpm-result', cpmCost > 0 && cpmImpressions > 0 ? `Rp ${Math.round((cpmCost / cpmImpressions) * 1000).toLocaleString('id-ID')}` : '-');
        const roasRevenue = getVal('roas-revenue'), roasCost = getVal('roas-cost');
        setResult('roas-result', roasRevenue > 0 && roasCost > 0 ? `${(roasRevenue / roasCost).toFixed(2)}x` : '-');
    };
    calculatorInputs.forEach(input => input.addEventListener('input', calculateMetrics));
});
