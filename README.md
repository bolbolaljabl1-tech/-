<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة بيان - تقارير ذكية</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #007bff; --bg: #f4f7f6; }
        body { font-family: 'Cairo', sans-serif; background: var(--bg); padding: 20px; text-align: center; }
        .container { background: white; padding: 25px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); max-width: 500px; margin: auto; }
        h1 { color: var(--primary); font-size: 22px; }
        input, textarea { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 12px; box-sizing: border-box; font-family: inherit; }
        .btn { background: var(--primary); color: white; border: none; padding: 15px 30px; border-radius: 12px; font-weight: bold; width: 100%; cursor: pointer; transition: 0.3s; }
        #result { margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 12px; min-height: 50px; text-align: right; white-space: pre-wrap; }
    </style>
</head>
<body>

<div class="container">
    <h1>✨ منصة بيان الذكية</h1>
    <p>صياغة تقارير الطلاب بذكاء Gemini 1.5</p>
    
    <input type="text" id="studentName" placeholder="اسم الطالب/ة">
    <textarea id="notes" rows="4" placeholder="اكتب ملاحظاتك المختصرة هنا..."></textarea>
    
    <button class="btn" onclick="generateReport()">توليد وحفظ التقرير</button>
    
    <div id="result">سيظهر التقرير التربوي هنا...</div>
</div>

<script>
    async function generateReport() {
        const name = document.getElementById('studentName').value;
        const notes = document.getElementById('notes').value;
        const resultDiv = document.getElementById('result');

        if (!notes) return alert("الرجاء كتابة الملاحظات!");

        resultDiv.innerText = "جاري التفكير والصياغة وحفظ البيانات...";

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentName: name, notes: notes })
            });

            const data = await response.json();
            resultDiv.innerText = data.text;
            alert("تم التوليد والحفظ بنجاح في الشؤون العامة!");
        } catch (error) {
            resultDiv.innerText = "حدث خطأ في الاتصال. تأكد من إعدادات Vercel.";
        }
    }
</script>

</body>
</html>
