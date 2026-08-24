import os
import glob

for f in glob.glob("src/store/*.ts"):
    with open(f, 'r') as file:
        content = file.read()
    
    content = content.replace("import { db } from '../lib/db';\n", "")
    
    # Replace dashboardStore
    if "dashboardStore" in f:
        content = content.replace("const data = await db.collection('dashboard_stats').findOne({});\n      set({ stats: data || { user_id: user.id } });", 
                                  "const { data, error } = await supabase.from('dashboard_stats').select('*').eq('user_id', user.id).maybeSingle();\n      if (error) throw error;\n      set({ stats: data || { user_id: user.id } });")
        content = content.replace("const data = await db.collection('dashboard_stats').upsert({}, updates);\n      set({ stats: data });",
                                  "const { data, error } = await supabase.from('dashboard_stats').upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' }).select().single();\n      if (error) throw error;\n      set({ stats: data });")

    # profileStore
    elif "profileStore" in f:
        content = content.replace("const data = await db.collection('profiles').findOne({ id: userId });\n      const error = null;",
                                  "const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();")
        content = content.replace("const insertError = null;\n            await db.collection('profiles').insert(newProfile);",
                                  "const { error: insertError } = await supabase.from('profiles').insert([newProfile]);")
        content = content.replace("const error = null;\n      await db.collection('profiles').upsert({ id: userId }, data);",
                                  "const { error } = await supabase.from('profiles').upsert({ id: userId, ...data }, { onConflict: 'id' });")
    
    # codingStore
    elif "codingStore" in f:
        content = content.replace("const error = null;\n      await db.collection('coding_submissions').insert(newSubmission);",
                                  "const { error } = await supabase.from('coding_submissions').insert([newSubmission]);")
        content = content.replace("const data = await db.collection('coding_submissions').find({ user_id: user.id }, { sort: { created_at: -1 } });\n      const error = null;",
                                  "const { data, error } = await supabase.from('coding_submissions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });")
    
    # interviewStore
    elif "interviewStore" in f:
        content = content.replace("const inserted = await db.collection('interview_history').insert(newInterview);\n      const error = null;",
                                  "const { data: inserted, error } = await supabase.from('interview_history').insert([newInterview]).select().single();")
        content = content.replace("const data = await db.collection('interview_history').update({ id }, updates);\n      const error = null;",
                                  "const { data, error } = await supabase.from('interview_history').update(updates).eq('id', id).select().single();")
        content = content.replace("""const updated = await db.collection('interview_history').update({ id }, {
          ...data,
          status: 'completed',
          completion_time: new Date().toISOString()
        });
      const error = null;""",
                                  """const { data: updated, error } = await supabase.from('interview_history').update({
          ...data,
          status: 'completed',
          completion_time: new Date().toISOString()
        }).eq('id', id).select().single();""")
        content = content.replace("const data = await db.collection('interview_history').find({ user_id: user.id }, { sort: { start_time: -1 } });\n      const error = null;",
                                  "const { data, error } = await supabase.from('interview_history').select('*').eq('user_id', user.id).order('start_time', { ascending: false });")

    # mockTestStore
    elif "mockTestStore" in f:
        content = content.replace("const inserted = await db.collection('mock_tests').insert(newTest);\n      const error = null;",
                                  "const { data: inserted, error } = await supabase.from('mock_tests').insert([newTest]).select().single();")
        content = content.replace("const data = await db.collection('mock_tests').update({ id }, updates);\n      const error = null;",
                                  "const { data, error } = await supabase.from('mock_tests').update(updates).eq('id', id).select().single();")
        content = content.replace("""const updated = await db.collection('mock_tests').update({ id }, {
          ...data,
          status: 'completed'
        });
      const error = null;""",
                                  """const { data: updated, error } = await supabase.from('mock_tests').update({
          ...data,
          status: 'completed'
        }).eq('id', id).select().single();""")
        content = content.replace("const data = await db.collection('mock_tests').find({ user_id: user.id }, { sort: { created_at: -1 } });\n      const error = null;",
                                  "const { data, error } = await supabase.from('mock_tests').select('*').eq('user_id', user.id).order('created_at', { ascending: false });")

    # progressStore
    elif "progressStore" in f:
        content = content.replace("let data = await db.collection('progress').findOne({ user_id: user.id });\n      let error = null;",
                                  "let { data, error } = await supabase.from('progress').select('*').eq('user_id', user.id).maybeSingle();")
        content = content.replace("const insertError = null;\n        await db.collection('progress').insert(newProgress);",
                                  "const { error: insertError } = await supabase.from('progress').insert([newProgress]);")
        content = content.replace("const interviews = await db.collection('interview_history').find({ user_id: user.id, status: 'completed' });\n      const interviewsCount = interviews.length;",
                                  "const { count: interviewsCount } = await supabase.from('interview_history').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'completed');")
        content = content.replace("const mockTests = await db.collection('mock_tests').find({ user_id: user.id, status: 'completed' });\n      const mockTestsCount = mockTests.length;",
                                  "const { count: mockTestsCount } = await supabase.from('mock_tests').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'completed');")
        content = content.replace("const codings = await db.collection('coding_submissions').find({ user_id: user.id });\n      const codingCount = codings.length;",
                                  "const { count: codingCount } = await supabase.from('coding_submissions').select('id', { count: 'exact', head: true }).eq('user_id', user.id);")
        content = content.replace("const roadmaps = await db.collection('learning_roadmap').find({ user_id: user.id }, { sort: { created_at: -1 }, limit: 1 });",
                                  "const { data: roadmaps } = await supabase.from('learning_roadmap').select('completion_percentage').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1);")
        content = content.replace("const data = await db.collection('progress').upsert({ user_id: user.id }, updates);\n      const error = null;",
                                  "const { data, error } = await supabase.from('progress').upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' }).select().maybeSingle();")

    # resumeStore
    elif "resumeStore" in f:
        content = content.replace("const inserted = await db.collection('resume_analysis').insert(newAnalysis);\n      const error = null;",
                                  "const { data: inserted, error } = await supabase.from('resume_analysis').insert([newAnalysis]).select().single();")
        content = content.replace("const data = await db.collection('resume_analysis').find({ user_id: user.id }, { sort: { upload_date: -1 } });\n      const error = null;",
                                  "const { data, error } = await supabase.from('resume_analysis').select('*').eq('user_id', user.id).order('upload_date', { ascending: false });")

    # roadmapStore
    elif "roadmapStore" in f:
        content = content.replace("const inserted = await db.collection('learning_roadmap').insert(newRoadmap);\n      const error = null;",
                                  "const { data: inserted, error } = await supabase.from('learning_roadmap').insert([newRoadmap]).select().single();")
        content = content.replace("const data = await db.collection('learning_roadmap').update({ id }, updates);\n      const error = null;",
                                  "const { data, error } = await supabase.from('learning_roadmap').update(updates).eq('id', id).select().single();")
        content = content.replace("const data = await db.collection('learning_roadmap').find({ user_id: user.id }, { sort: { created_at: -1 } });\n      const error = null;",
                                  "const { data, error } = await supabase.from('learning_roadmap').select('*').eq('user_id', user.id).order('created_at', { ascending: false });")

    # savedQuestionStore
    elif "savedQuestionStore" in f:
        content = content.replace("const data = await db.collection('saved_questions').find({ user_id: user.id });\n      const error = null;",
                                  "const { data, error } = await supabase.from('saved_questions').select('*').eq('user_id', user.id);")
        content = content.replace("await db.collection('saved_questions').insert({ ...question, user_id: user.id });",
                                  "await supabase.from('saved_questions').insert([{ ...question, user_id: user.id }]);")
        content = content.replace("await db.collection('saved_questions').delete({ id });",
                                  "await supabase.from('saved_questions').delete().eq('id', id);")

    # notificationStore
    elif "notificationStore" in f:
        content = content.replace("const data = await db.collection('notifications').find({ user_id: user.id }, { sort: { created_at: -1 } });\n      const error = null;",
                                  "const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });")
        content = content.replace("await db.collection('notifications').update({ id }, { is_read: true });",
                                  "await supabase.from('notifications').update({ is_read: true }).eq('id', id);")
        content = content.replace("await db.collection('notifications').delete({ id });",
                                  "await supabase.from('notifications').delete().eq('id', id);")
        content = content.replace("""await db.collection('notifications').insert({
        user_id: user.id,
        title,
        message,
        type,
        is_read: false
      });""",
                                  """await supabase.from('notifications').insert([{
        user_id: user.id,
        title,
        message,
        type,
        is_read: false
      }]);""")

    # settingsStore
    elif "settingsStore" in f:
        content = content.replace("let data = await db.collection('user_settings').findOne({ user_id: user.id });\n      let error = null;",
                                  "let { data, error } = await supabase.from('user_settings').select('*').eq('user_id', user.id).maybeSingle();")
        content = content.replace("const insErr = null;\n        await db.collection('user_settings').insert(newSettings);",
                                  "const { error: insErr } = await supabase.from('user_settings').insert([newSettings]);")
        content = content.replace("const data = await db.collection('user_settings').upsert({ user_id: user.id }, updates);\n      const error = null;",
                                  "const { data, error } = await supabase.from('user_settings').upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' }).select().maybeSingle();")

    # leaderboardStore
    elif "leaderboardStore" in f:
        content = content.replace("""// Note: Since leaderboard needs all users, we created a custom route for it
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      const error = null;""",
                                  "const { data, error } = await supabase.from('leaderboard').select('*').order('total_xp', { ascending: false }).limit(100);")
        content = content.replace("const insErr = null;\n           await db.collection('leaderboard').insert(newEntry);",
                                  "const { error: insErr } = await supabase.from('leaderboard').insert([newEntry]);")
        content = content.replace("let existing = await db.collection('leaderboard').findOne({ user_id: user.id });",
                                  "let { data: existing } = await supabase.from('leaderboard').select('*').eq('user_id', user.id).maybeSingle();")
        content = content.replace("const insErr = null;\n        await db.collection('leaderboard').insert({ user_id: user.id, ...updates });",
                                  "const { error: insErr } = await supabase.from('leaderboard').insert([{ user_id: user.id, ...updates }]);")
        content = content.replace("await db.collection('leaderboard').update({ user_id: user.id }, updates);",
                                  "await supabase.from('leaderboard').update(updates).eq('user_id', user.id);")

    # companyRoleStore
    elif "companyRoleStore" in f:
        content = content.replace("db.collection('companies').find({})",
                                  "supabase.from('companies').select('*')")
        content = content.replace("db.collection('job_roles').find({})",
                                  "supabase.from('job_roles').select('*')")
        content = content.replace("companies: (compRes as any) || [],",
                                  "companies: compRes.data || [],")
        content = content.replace("roles: (roleRes as any) || []",
                                  "roles: roleRes.data || []")

    with open(f, 'w') as file:
        file.write(content)

print("Done fixing stores.")
