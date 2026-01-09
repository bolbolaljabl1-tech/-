import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { studentName, notes } = req.body;
  
  // سحب المفاتيح سرياً من حصن Vercel
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const geminiKey = process.env.GEMINI_API_KEY;

  try {
    // 1. طلب الصياغة التربوية من ذكاء Gemini
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `أنت معلم خبير في المنهج السعودي، صغ تقريراً تربوياً بليغاً ومحفزاً للطالب (${studentName}) بناءً على الملاحظات التالية: ${notes}` }] }]
      })
    });
    
    const geminiData = await geminiRes.json();
    const aiReport = geminiData.candidates[0].content.parts[0].text;

    // 2. حفظ التقرير فوراً في جدول reports الذي أنشأته
    const { error } = await supabase.from('reports').insert([
      { student_name: studentName, report_content: aiReport }
    ]);

    if (error) throw error;

    res.status(200).json({ text: aiReport });
  } catch (error) {
    res.status(500).json({ error: "تعذر التوليد أو الحفظ: " + error.message });
  }
}
