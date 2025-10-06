import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('display_order');
    if (data) setProjects(data);
  };

  const projectTypes = ['all', 'villa', 'apartment', 'house', 'penthouse'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.project_type.toLowerCase() === filter);

  const openLightbox = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.gallery_images) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % (selectedProject.gallery_images.length + 1)
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.gallery_images) {
      const totalImages = selectedProject.gallery_images.length + 1;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const getCurrentImage = () => {
    if (!selectedProject) return '';
    if (currentImageIndex === 0) return selectedProject.image_url;
    return selectedProject.gallery_images[currentImageIndex - 1];
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-black mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Explore our collection of luxury residential projects, each one a testament to exceptional design and craftsmanship.
          </p>
          <div className="w-24 h-px bg-amber-400 mx-auto mt-8"></div>
        </div>

        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 font-light tracking-wider transition-all duration-300 ${
                filter === type
                  ? 'bg-black text-white'
                  : 'bg-white text-black border border-gray-300 hover:border-black'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
              onClick={() => openLightbox(project)}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light text-black mb-2">{project.title}</h3>
                <p className="text-amber-400 text-sm font-light tracking-wider mb-3">
                  {project.project_type} • {project.location}
                </p>
                <p className="text-gray-600 font-light line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-light">
              No projects found for this category.
            </p>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-white hover:text-amber-400 transition-colors duration-300"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-8 text-white hover:text-amber-400 transition-colors duration-300"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-8 text-white hover:text-amber-400 transition-colors duration-300"
          >
            <ChevronRight size={48} />
          </button>

          <div className="max-w-6xl w-full">
            <img
              src={getCurrentImage()}
              alt={selectedProject.title}
              className="w-full max-h-[80vh] object-contain mb-8"
            />
            <div className="text-center text-white">
              <h3 className="text-3xl font-light mb-2">{selectedProject.title}</h3>
              <p className="text-amber-400 text-sm font-light tracking-wider mb-4">
                {selectedProject.project_type} • {selectedProject.location}
              </p>
              <p className="text-gray-300 font-light max-w-3xl mx-auto">
                {selectedProject.description}
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Image {currentImageIndex + 1} of {(selectedProject.gallery_images?.length || 0) + 1}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
