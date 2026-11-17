import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Head from 'next/head';
import { FaTrash, FaPlus, FaSave, FaImage, FaSignOutAlt, FaBriefcase, FaCode } from 'react-icons/fa';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'projects' | 'services' | 'experience'

  // Queries
  const { data: siteInfo } = useQuery(['siteInfo'], () => axios.get('/api/siteinfo').then((r) => r.data));
  const { data: projects } = useQuery(['projects'], () => axios.get('/api/projects').then((r) => r.data));
  const { data: services } = useQuery(['services'], () => axios.get('/api/services').then((r) => r.data));
  const { data: experiences } = useQuery(['experience'], () => axios.get('/api/experience').then((r) => r.data));

  // Mutations
  const updateSiteInfo = useMutation((payload) => axios.put('/api/siteinfo', payload).then((r) => r.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['siteInfo']);
      alert('Profile updated successfully!');
    },
  });

  const addProject = useMutation((payload) => axios.post('/api/projects', payload).then((r) => r.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      setProjForm({ title: '', description: '', techStack: [], demoUrl: '', repoUrl: '', imageUrl: '' });
      alert('Project added successfully!');
    },
  });

  const deleteProject = useMutation((id) => axios.delete(`/api/projects?id=${id}`), {
    onSuccess: () => queryClient.invalidateQueries(['projects']),
  });

  const addService = useMutation((payload) => axios.post('/api/services', payload).then((r) => r.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['services']);
      setServiceForm({ title: '', description: '', icon: 'FaCode', featuresString: '' });
      alert('Service added!');
    },
  });

  const deleteService = useMutation((id) => axios.delete(`/api/services?id=${id}`), {
    onSuccess: () => queryClient.invalidateQueries(['services']),
  });

  const addExperience = useMutation((payload) => axios.post('/api/experience', payload).then((r) => r.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['experience']);
      setExpForm({ role: '', company: '', location: '', period: '', description: '', techString: '' });
      alert('Experience added!');
    },
  });

  const deleteExperience = useMutation((id) => axios.delete(`/api/experience?id=${id}`), {
    onSuccess: () => queryClient.invalidateQueries(['experience']),
  });

  // Forms
  const [siteForm, setSiteForm] = useState({
    name: '',
    tagline: '',
    bio: '',
    avatarUrl: '',
    contactEmail: '',
    phone: '',
    location: '',
    skills: [],
  });

  const [newSkillInput, setNewSkillInput] = useState('');
  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    techStack: [],
    demoUrl: '',
    repoUrl: '',
    imageUrl: '',
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: 'FaCode',
    featuresString: '',
  });

  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    location: '',
    period: '',
    description: '',
    techString: '',
  });

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingProjImg, setUploadingProjImg] = useState(false);

  useEffect(() => {
    if (siteInfo) {
      setSiteForm({
        name: siteInfo.name || '',
        tagline: siteInfo.tagline || '',
        bio: siteInfo.bio || '',
        avatarUrl: siteInfo.avatarUrl || '',
        contactEmail: siteInfo.contactEmail || '',
        phone: siteInfo.phone || '',
        location: siteInfo.location || '',
        skills: siteInfo.skills || [],
      });
    }
  }, [siteInfo]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50 text-center">Admin Portal Login</h2>
          <p className="mt-2 text-center text-sm text-slate-400">Sign in to manage and edit your portfolio</p>
          <div className="mt-8">
            <button
              onClick={() => signIn()}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
            >
              Sign In with Credentials
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Upload Avatar
  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    setUploadingAvatar(true);
    try {
      const res = await axios.post('/api/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSiteForm({ ...siteForm, avatarUrl: res.data.url });
    } catch (err) {
      console.error(err);
      alert('Avatar upload failed');
    } finally {
      setUploadingAvatar(false);
    }
  }

  // Upload Project Image
  async function handleProjImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    setUploadingProjImg(true);
    try {
      const res = await axios.post('/api/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setProjForm({ ...projForm, imageUrl: res.data.url });
    } catch (err) {
      console.error(err);
      alert('Project image upload failed');
    } finally {
      setUploadingProjImg(false);
    }
  }

  // Skill management
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const updated = [...(siteForm.skills || []), newSkillInput.trim()];
    setSiteForm({ ...siteForm, skills: updated });
    setNewSkillInput('');
  };

  const handleDeleteSkill = (skillToDelete) => {
    const updated = siteForm.skills.filter((s) => s !== skillToDelete);
    setSiteForm({ ...siteForm, skills: updated });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateSiteInfo.mutate(siteForm);
  };

  return (
    <>
      <Head>
        <title>Full Admin Control Center — Suraj Gupta</title>
      </Head>
      <Navbar />

      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-50">
                Master <span className="text-gradient">Admin Center</span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">Manage all portfolio content, photos, skills, and projects</p>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-300 transition hover:bg-rose-950/40 hover:text-rose-300 self-start sm:self-auto"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
            {[
              { id: 'profile', label: '👤 Profile & Photo' },
              { id: 'skills', label: '⚡ Skills Management' },
              { id: 'projects', label: '🚀 Projects Manager' },
              { id: 'services', label: '🛠️ Services' },
              { id: 'experience', label: '💼 Career Experience' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'bg-slate-900/70 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Profile & Photo */}
          {activeTab === 'profile' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm max-w-4xl">
              <h2 className="text-xl font-bold text-slate-50 mb-6">Profile &amp; Biography Settings</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Photo Upload & Preview */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="relative">
                    <img
                      src={siteForm.avatarUrl || '/images/profile.png'}
                      alt="Avatar"
                      className="h-28 w-28 rounded-full border-2 border-blue-500/40 object-cover shadow-lg"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=Suraj+Gupta&size=300&background=1e40af&color=fff';
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="block text-sm font-medium text-slate-200">Profile Photo / Avatar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="block w-full text-xs text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-xs file:font-medium file:text-blue-400 hover:file:bg-slate-700 cursor-pointer"
                    />
                    {uploadingAvatar && <p className="text-xs text-blue-400 animate-pulse">Uploading photo...</p>}
                    <p className="text-xs text-slate-500">Or enter an image URL directly:</p>
                    <input
                      type="text"
                      placeholder="https://..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-100"
                      value={siteForm.avatarUrl}
                      onChange={(e) => setSiteForm({ ...siteForm, avatarUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
                      value={siteForm.name}
                      onChange={(e) => setSiteForm({ ...siteForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Tagline</label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
                      value={siteForm.tagline}
                      onChange={(e) => setSiteForm({ ...siteForm, tagline: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">About Biography</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none resize-none"
                    value={siteForm.bio}
                    onChange={(e) => setSiteForm({ ...siteForm, bio: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Email</label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
                      value={siteForm.contactEmail}
                      onChange={(e) => setSiteForm({ ...siteForm, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Phone</label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
                      value={siteForm.phone}
                      onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Location</label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
                      value={siteForm.location}
                      onChange={(e) => setSiteForm({ ...siteForm, location: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={updateSiteInfo.isLoading}
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
                >
                  <FaSave /> Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Skills Management */}
          {activeTab === 'skills' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 max-w-4xl">
              <h2 className="text-xl font-bold text-slate-50 mb-2">Technical Skills Manager</h2>
              <p className="text-sm text-slate-400 mb-6">Add or delete individual skills in real-time. Changes are saved with one click.</p>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="flex gap-3 mb-8">
                <input
                  type="text"
                  placeholder="e.g. Next.js, Redis, Docker, Tailwind CSS..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 outline-none"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition"
                >
                  <FaPlus /> Add Skill
                </button>
              </form>

              {/* Current Skills list with Delete buttons */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 mb-6">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
                  Active Skills List ({siteForm.skills?.length || 0}) — Click the × to delete
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {siteForm.skills && siteForm.skills.length > 0 ? (
                    siteForm.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="group inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3.5 py-1.5 text-sm font-medium text-slate-200 transition hover:border-rose-500/50 hover:bg-rose-950/20"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleDeleteSkill(skill)}
                          className="text-slate-400 hover:text-rose-400 transition"
                          title="Delete skill"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No skills added yet.</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-500 transition"
              >
                <FaSave /> Save Skills to Database
              </button>
            </div>
          )}

          {/* TAB 3: Projects Manager */}
          {activeTab === 'projects' && (
            <div className="space-y-12">
              {/* Add Project Form */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 max-w-4xl">
                <h2 className="text-xl font-bold text-slate-50 mb-6">Create New Project</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addProject.mutate(projForm);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Title</label>
                    <input
                      required
                      placeholder="e.g. Tuition SaaS Platform"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                      value={projForm.title}
                      onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Project architecture and features..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 resize-none"
                      value={projForm.description}
                      onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Tech Stack (comma separated)</label>
                    <input
                      placeholder="Next.js, TypeScript, Tailwind, MongoDB"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                      value={projForm.techStack.join(', ')}
                      onChange={(e) =>
                        setProjForm({
                          ...projForm,
                          techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Demo URL</label>
                      <input
                        placeholder="https://..."
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                        value={projForm.demoUrl}
                        onChange={(e) => setProjForm({ ...projForm, demoUrl: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Repo URL</label>
                      <input
                        placeholder="https://github.com/..."
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                        value={projForm.repoUrl}
                        onChange={(e) => setProjForm({ ...projForm, repoUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Screenshot upload */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Project Screenshot</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjImageUpload}
                      className="block w-full text-xs text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-xs file:font-medium file:text-blue-400 hover:file:bg-slate-700"
                    />
                    {uploadingProjImg && <p className="text-xs text-blue-400 animate-pulse mt-1">Uploading...</p>}
                    <input
                      type="text"
                      placeholder="Or paste image URL (Unsplash, etc.)"
                      className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-100"
                      value={projForm.imageUrl}
                      onChange={(e) => setProjForm({ ...projForm, imageUrl: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={addProject.isLoading}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500"
                  >
                    <FaPlus /> Add Project
                  </button>
                </form>
              </div>

              {/* Published Projects List & Delete */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-50 mb-6">Published Projects ({projects?.length || 0})</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {projects?.map((p) => (
                    <div key={p._id} className="relative rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden flex flex-col justify-between">
                      {p.imageUrl && (
                        <div className="h-40 overflow-hidden bg-slate-900 border-b border-slate-800">
                          <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-100">{p.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {p.techStack?.map((t, i) => (
                              <span key={i} className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500">ID: {p._id.slice(-6)}</span>
                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${p.title}"?`)) {
                                deleteProject.mutate(p._id);
                              }
                            }}
                            className="flex items-center gap-1 rounded bg-rose-950/50 border border-rose-900/60 px-2.5 py-1 text-xs text-rose-300 hover:bg-rose-900 transition"
                          >
                            <FaTrash className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Services */}
          {activeTab === 'services' && (
            <div className="space-y-12">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 max-w-4xl">
                <h2 className="text-xl font-bold text-slate-50 mb-6">Add New Service</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addService.mutate({
                      title: serviceForm.title,
                      description: serviceForm.description,
                      icon: serviceForm.icon,
                      features: serviceForm.featuresString.split(',').map((s) => s.trim()).filter(Boolean),
                    });
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Service Title</label>
                    <input
                      required
                      placeholder="e.g. MERN Stack Web Applications"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Details of the service..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 resize-none"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Icon Key</label>
                    <select
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                      value={serviceForm.icon}
                      onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    >
                      <option value="FaCode">FaCode (Frontend / Coding)</option>
                      <option value="FaServer">FaServer (Backend / Servers)</option>
                      <option value="FaDatabase">FaDatabase (Database / Python)</option>
                      <option value="FaCloud">FaCloud (APIs / Cloud)</option>
                      <option value="FaRocket">FaRocket (Optimization / Speed)</option>
                      <option value="FaMobileAlt">FaMobileAlt (Mobile / UI)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Feature Bullet Points (comma separated)</label>
                    <input
                      placeholder="Feature 1, Feature 2, Feature 3"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                      value={serviceForm.featuresString}
                      onChange={(e) => setServiceForm({ ...serviceForm, featuresString: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition"
                  >
                    <FaPlus /> Add Service
                  </button>
                </form>
              </div>

              {/* Services List */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-50 mb-6">Active Services ({services?.length || 0})</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {services?.map((s) => (
                    <div key={s._id} className="flex items-start justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                      <div>
                        <h4 className="font-semibold text-slate-100">{s.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{s.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${s.title}"?`)) deleteService.mutate(s._id);
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 p-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-12">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 max-w-4xl">
                <h2 className="text-xl font-bold text-slate-50 mb-6">Add Experience Entry</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addExperience.mutate({
                      role: expForm.role,
                      company: expForm.company,
                      location: expForm.location,
                      period: expForm.period,
                      description: expForm.description,
                      technologies: expForm.techString.split(',').map((s) => s.trim()).filter(Boolean),
                    });
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Role Title</label>
                      <input
                        required
                        placeholder="e.g. Senior Full-Stack Engineer"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Company</label>
                      <input
                        required
                        placeholder="e.g. Apex Digital Systems"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                        value={expForm.company}
                        onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Time Period</label>
                      <input
                        placeholder="e.g. 2022 - Present"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                        value={expForm.period}
                        onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Location</label>
                      <input
                        placeholder="e.g. Lucknow, India (Remote)"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                        value={expForm.location}
                        onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Achievements and responsibilities..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 resize-none"
                      value={expForm.description}
                      onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Technologies Used (comma separated)</label>
                    <input
                      placeholder="Next.js, Node.js, MongoDB, Docker"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                      value={expForm.techString}
                      onChange={(e) => setExpForm({ ...expForm, techString: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition"
                  >
                    <FaPlus /> Add Career Milestone
                  </button>
                </form>
              </div>

              {/* Experience List */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-50 mb-6">Career Timeline ({experiences?.length || 0})</h3>
                <div className="space-y-3">
                  {experiences?.map((exp) => (
                    <div key={exp._id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                      <div>
                        <h4 className="font-semibold text-slate-100">{exp.role} <span className="text-blue-400 font-normal">at {exp.company}</span></h4>
                        <p className="text-xs text-slate-400">{exp.period} • {exp.location}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete experience at "${exp.company}"?`)) deleteExperience.mutate(exp._id);
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 p-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
