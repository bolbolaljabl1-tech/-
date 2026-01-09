// هذا الكود يربط Gemini مع Supabase سرياً
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { studentName, notes } = req.body;
  
  // سحب المفاتيح سرياً من حصن Vercel
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const geminiKey = process.env.GEMINI_API_KEY;

  try {
    // 1. طلب الصياغة من Gemini
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `أنت معلم خبير، صغ تقريراً تربوياً للطالب (${studentName}) بناءً على: ${notes}` }] }]
      })
    });
    const geminiData = await geminiRes.json();
    const aiReport = geminiData.candidates[0].content.parts[0].text;

    // 2. حفظ التقرير في خزان Supabase
    await supabase.from('reports').insert([
      { student_name: studentName, report_content: aiReport }
    ]);

    res.status(200).json({ text: aiReport });
  } catch (error) {
    res.status(500).json({ error: "فشل في التوليد أو الحفظ" });
  }
}
