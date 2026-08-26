import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  HardDrive, 
  UploadCloud, 
  FileText, 
  FileCode, 
  Image as ImageIcon, 
  Archive, 
  Download, 
  Trash2, 
  Search, 
  Plus, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface StorageFile {
  id: string;
  name: string;
  size: string;
  type: 'document' | 'code' | 'image' | 'archive';
  uploadedAt: string;
  downloadUrl: string;
}

export const FilesView: React.FC = () => {
  const { showSuccess, showError } = useToast();

  const [files, setFiles] = useState<StorageFile[]>([
    { id: 'f-1', name: 'quantum-mesh-architecture-v3.pdf', size: '4.8 MB', type: 'document', uploadedAt: 'Today, 2:45 PM', downloadUrl: '#' },
    { id: 'f-2', name: 'firestore-schema-manifest.json', size: '128 KB', type: 'code', uploadedAt: 'Yesterday', downloadUrl: '#' },
    { id: 'f-3', name: 'soc2-security-audit-report-2026.pdf', size: '12.4 MB', type: 'document', uploadedAt: 'Feb 18, 2026', downloadUrl: '#' },
    { id: 'f-4', name: 'edge-cluster-topology-diagram.png', size: '3.2 MB', type: 'image', uploadedAt: 'Feb 15, 2026', downloadUrl: '#' },
    { id: 'f-5', name: 'openapi-specification-v3.0.yaml', size: '450 KB', type: 'code', uploadedAt: 'Feb 12, 2026', downloadUrl: '#' },
    { id: 'f-6', name: 'backup-snapshot-us-west-cluster.tar.gz', size: '240 MB', type: 'archive', uploadedAt: 'Feb 10, 2026', downloadUrl: '#' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    const newFiles: StorageFile[] = Array.from(uploaded).map((file: File, idx: number) => ({
      id: `f-${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: (file.name.endsWith('.pdf') || file.name.endsWith('.docx') ? 'document' :
            file.name.endsWith('.png') || file.name.endsWith('.jpg') ? 'image' :
            file.name.endsWith('.zip') || file.name.endsWith('.gz') ? 'archive' : 'code') as StorageFile['type'],
      uploadedAt: 'Just now',
      downloadUrl: '#',
    }));

    setFiles((prev) => [...newFiles, ...prev]);
    showSuccess(`Uploaded ${newFiles.length} file(s) to encrypted cloud storage`);
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    showSuccess('File removed from cloud storage');
  };

  const filteredFiles = files.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = activeType === 'all' || f.type === activeType;
    return matchSearch && matchType;
  });

  const getIcon = (type: StorageFile['type']) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5 text-indigo-400" />;
      case 'code': return <FileCode className="w-5 h-5 text-cyan-400" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-emerald-400" />;
      case 'archive': return <Archive className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
            <HardDrive className="w-7 h-7 text-cyan-400" />
            <span>Encrypted Asset & Schema Storage</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            AES-256 encrypted artifact repository for design blueprints, API schemas, and deployment snapshots.
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
          <UploadCloud className="w-4 h-4" />
          <span>Upload Artifact</span>
          <input type="file" multiple onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Storage Quota Card & Drag/Drop Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quota */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-code font-bold uppercase text-slate-400">Storage Usage</span>
              <span className="text-xs font-bold text-cyan-400">2.6 GB / 50 GB</span>
            </div>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full w-[12%]" />
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Documents & Reports:</span>
                <span className="font-mono-code">1.2 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Code & Schemas:</span>
                <span className="font-mono-code">180 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Snapshots & Backups:</span>
                <span className="font-mono-code">1.22 GB</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-emerald-400 text-xs font-mono-code">
            <CheckCircle2 className="w-4 h-4" />
            <span>Encrypted at Rest (AES-256 GCM)</span>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files.length) {
              const fakeEvent = { target: { files: e.dataTransfer.files } } as any;
              handleFileUpload(fakeEvent);
            }
          }}
          className={`lg:col-span-8 p-6 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
            isDragging ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-base text-white">
            Drag and drop files to upload
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
            Supports schemas, architecture diagrams, PDF audits, and tarball builds up to 500MB each.
          </p>
          <label className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors cursor-pointer">
            Browse Local Files
            <input type="file" multiple onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artifacts by file name or extension..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'document', 'code', 'image', 'archive'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition-colors shrink-0 cursor-pointer ${
                activeType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Files Table List */}
      <div className="p-4 rounded-3xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 font-mono-code uppercase">
              <th className="pb-3">File Name</th>
              <th className="pb-3">Size</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Uploaded</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredFiles.map((file) => (
              <tr key={file.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                      {getIcon(file.type)}
                    </div>
                    <span className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                      {file.name}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 font-mono-code text-slate-400">{file.size}</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono-code font-bold uppercase bg-white/[0.05] text-cyan-300">
                    {file.type}
                  </span>
                </td>
                <td className="py-3.5 text-slate-400">{file.uploadedAt}</td>
                <td className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => showSuccess(`Downloaded ${file.name}`)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-cyan-400/20 text-slate-300 hover:text-cyan-300 transition-colors"
                      title="Download artifact"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                      title="Delete file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
