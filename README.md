async function generateBayanAI() {
    const name = document.getElementById('studentName').value;
    const noteText = document.getElementById('notes').value;
    const outputDiv = document.getElementById('output');

    if (!noteText) return alert("يرجى كتابة الملاحظات أولاً");

    outputDiv.innerText = "جاري الاتصال بـ Gemini وحفظ التقرير في الشؤون العامة...";

    try {
        // الاتصال بالجسر الذي أنشأناه في مجلد api
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentName: name, notes: noteText })
        });

        const data = await response.json();
        
        if (data.text) {
            outputDiv.innerText = data.text;
            alert("تم التوليد والحفظ في قاعدة البيانات بنجاح! 🎉");
        } else {
            throw new Error(data.error || "خطأ غير معروف");
        }
    } catch (error) {
        outputDiv.innerText = "فشل العملية. تأكد من إعدادات المفاتيح في Vercel.";
        console.error(error);
    }
}
