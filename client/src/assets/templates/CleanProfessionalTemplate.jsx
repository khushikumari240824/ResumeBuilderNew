import { Mail, Phone, MapPin, Globe } from "lucide-react";

const CleanProfessionalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900">
      <header
        className="px-8 py-10 border-b"
        style={{ borderColor: `${accentColor}33` }}
      >
        <div className="flex flex-col gap-5">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: accentColor }}
            >
              Resume Template
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              {data.personal_info?.profession || "Your profession"}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe className="size-4" />
                <span className="break-all">{data.personal_info.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-8 py-8 space-y-8">
        {data.professional_summary && (
          <section>
            <h2
              className="text-sm font-semibold uppercase tracking-[0.22em] mb-3"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="leading-7 text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section>
            <h2
              className="text-sm font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: accentColor }}
            >
              Experience
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <article
                  key={index}
                  className="rounded-2xl border p-5"
                  style={{ borderColor: `${accentColor}22` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-7 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {data.education && data.education.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold uppercase tracking-[0.22em] mb-4"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="rounded-xl bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills && data.skills.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold uppercase tracking-[0.22em] mb-4"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.project && data.project.length > 0 && (
          <section>
            <h2
              className="text-sm font-semibold uppercase tracking-[0.22em] mb-4"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {data.project.map((project, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.type && <p className="text-sm text-gray-500">{project.type}</p>}
                  {project.description && (
                    <p className="mt-1 text-gray-700 leading-7">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CleanProfessionalTemplate;