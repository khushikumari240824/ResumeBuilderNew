import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [editResumeId, setEditResumeId]=useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    const resumes = await Promise.resolve(dummyResumeData);
    setAllResumes(resumes);
  };

  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate("/app/builder/res123");
  };

  const uploadResume = async (event) => {
    event.preventDefault();

    console.log("Title:", title);
    console.log("File:", resume);

    setShowUploadResume(false);
    navigate("/app/builder/res123");
  };
  const editTitle = async (event)=>{
    event.preventDefault();


  }
    const deleteResume = async (resumeId)=>{
    const confirm = window.confirm('Are you sure you want to delete this resume')
    if(confirm){
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }


  }
  useEffect(() => {
  setAllResumes(dummyResumeData);
}, []);



  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Doe
        </p>

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">
              Upload Existing
            </p>
          </button>

        </div>

        <hr className="border-slate-300 my-6 sm:w-76.25" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={index} onClick={()=>navigate('/app/builder/${resume.id')}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <div onClick={e=>e.stopPropagation()} className="absolute top-1 right-1 hidden group-hover:flex">
                  <TrashIcon onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded" />
                  <PencilIcon onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded" />
                </div>

                <FilePenLineIcon
                  className="size-7"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </button>
            );
          })}
        </div>

        {/* ================= CREATE MODAL ================= */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-sm relative"
            >
              <h2 className="text-xl font-bold mb-4">Create Resume</h2>

              <input
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded">
                Create
              </button>

              <XIcon
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}


        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-sm relative"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded"
                required
              />

              {/* Upload UI */}
              <label htmlFor="resume-input">
                <div className="flex flex-col items-center justify-center gap-2 border border-dashed rounded-md p-6 my-4 cursor-pointer hover:border-green-500">
                  {resume ? (
                    <p className="text-green-600">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-12" />
                      <p>Upload resume</p>
                    </>
                  )}
                </div>
              </label>

              <input
                id="resume-input"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button className="w-full py-2 bg-green-600 text-white rounded">
                Upload
              </button>

              <XIcon
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
              />
            </div>
          </form>
        )}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-sm relative"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

              <input
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded">
                Update
              </button>

              <XIcon
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => {
                  setEditResumeId('');
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Dashboard;