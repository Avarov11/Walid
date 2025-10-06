import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Award, Users } from 'lucide-react';
import { supabase, isSupabaseConfigured, type Project } from '../lib/supabase';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchFeaturedProjects();
    }
  }, []);

  const fetchFeaturedProjects = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('display_order')
      .limit(3);
    if (data) setFeaturedProjects(data);
  };

  const stats = [
    { icon: Sparkles, value: '250+', label: 'Projects Completed' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
        ))}

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-4 md:mb-6 leading-tight animate-fade-in-up">
                Luxury Living
                <br />
                <span className="text-amber-400">Redefined</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light mb-6 md:mb-8 leading-relaxed animate-fade-in-up-delay">
                Transform your space into a masterpiece. From vision to reality, we craft bespoke interiors that inspire.
              </p>
              <button
                onClick={() => onNavigate('reservation')}
                className="group bg-amber-400 hover:bg-amber-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-none font-light tracking-wider transition-all duration-300 inline-flex items-center space-x-2 animate-fade-in-up-delay-2 text-sm sm:text-base"
              >
                <span>BOOK YOUR CONSULTATION</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1 transition-all duration-300 ${
                  index === currentImageIndex ? 'w-8 sm:w-12 bg-amber-400' : 'w-6 sm:w-8 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 border border-gray-200 hover:border-amber-400 transition-all duration-500 group"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-4xl font-light text-black mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-light tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
                Featured Projects
              </h2>
              <div className="w-24 h-px bg-amber-400 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer overflow-hidden"
                  onClick={() => onNavigate('portfolio')}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-xl font-light mb-2">{project.title}</h3>
                      <p className="text-amber-400 text-sm font-light tracking-wider">{project.project_type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('portfolio')}
                className="group border-2 border-black hover:bg-black hover:text-white px-8 py-4 rounded-none font-light tracking-wider transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>VIEW ALL PROJECTS</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="relative py-20 sm:py-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8 leading-relaxed">
            Let's bring your vision to life with our expert design team.
          </p>
          <button
            onClick={() => onNavigate('reservation')}
            className="group bg-amber-400 hover:bg-amber-500 text-black px-12 py-5 rounded-none font-light tracking-wider transition-all duration-300 inline-flex items-center space-x-2"
          >
            <span>START YOUR PROJECT</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
