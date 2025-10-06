import { Home, Ruler, Palette, Lightbulb, Sofa, HardHat, ClipboardCheck, Package } from 'lucide-react';

interface ServiceProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServiceProps) {
  const services = [
    {
      icon: Home,
      title: 'Complete Interior Design',
      description: 'End-to-end design solutions from concept to completion, creating cohesive and luxurious living spaces tailored to your lifestyle.'
    },
    {
      icon: Ruler,
      title: 'Space Planning',
      description: 'Expert spatial analysis and layout design to optimize flow, functionality, and aesthetic appeal of every room.'
    },
    {
      icon: Palette,
      title: 'Color Consultation',
      description: 'Professional color palette selection and material specification to create harmonious and sophisticated interiors.'
    },
    {
      icon: Lightbulb,
      title: 'Lighting Design',
      description: 'Strategic lighting plans combining ambient, task, and accent lighting to enhance mood and highlight architectural features.'
    },
    {
      icon: Sofa,
      title: 'Furniture Selection',
      description: 'Curated selection of high-end furniture pieces and custom designs that perfectly complement your space and lifestyle.'
    },
    {
      icon: HardHat,
      title: 'Project Management',
      description: 'Full project oversight from start to finish, coordinating contractors, vendors, and timelines to ensure seamless execution.'
    },
    {
      icon: ClipboardCheck,
      title: '3D Visualization',
      description: 'Photorealistic 3D renderings and virtual walkthroughs to help you visualize the final result before construction begins.'
    },
    {
      icon: Package,
      title: 'Styling & Accessories',
      description: 'Final styling touches including art curation, accessories, textiles, and decorative elements that complete the look.'
    }
  ];

  const process = [
    {
      number: '01',
      title: 'Consultation',
      description: 'Initial meeting to understand your vision, requirements, and budget.'
    },
    {
      number: '02',
      title: 'Concept Design',
      description: 'Development of design concepts, mood boards, and preliminary layouts.'
    },
    {
      number: '03',
      title: 'Design Development',
      description: 'Detailed plans, 3D visualizations, and material specifications.'
    },
    {
      number: '04',
      title: 'Implementation',
      description: 'Project execution with full coordination and quality control.'
    },
    {
      number: '05',
      title: 'Final Reveal',
      description: 'Final styling and handover of your beautifully transformed space.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light text-black mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Comprehensive interior design solutions tailored to create exceptional living spaces that reflect your unique style.
          </p>
          <div className="w-24 h-px bg-amber-400 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-200 hover:border-amber-400 hover:shadow-xl transition-all duration-500"
            >
              <service.icon className="w-12 h-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-light text-black mb-4">{service.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-stone-50 py-20 -mx-6 lg:-mx-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
                Our Process
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                A streamlined approach ensuring every project is executed flawlessly from concept to completion.
              </p>
              <div className="w-24 h-px bg-amber-400 mx-auto mt-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-amber-400 rounded-full mb-6 bg-white">
                    <span className="text-2xl font-light text-amber-400">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-light text-black mb-3">{step.title}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
                Why Choose Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <div>
                    <h3 className="text-xl font-light text-black mb-2">Bespoke Design</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Every project is uniquely crafted to reflect your personal style and needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <div>
                    <h3 className="text-xl font-light text-black mb-2">Expert Team</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Award-winning designers with over 15 years of luxury interior experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <div>
                    <h3 className="text-xl font-light text-black mb-2">Premium Quality</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      We source only the finest materials and work with trusted craftsmen.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <div>
                    <h3 className="text-xl font-light text-black mb-2">Seamless Execution</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Full project management ensuring on-time delivery and exceptional results.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('reservation')}
                className="mt-10 bg-amber-400 hover:bg-amber-500 text-black px-10 py-4 rounded-none font-light tracking-wider transition-all duration-300"
              >
                START YOUR PROJECT
              </button>
            </div>
            <div className="relative h-[600px]">
              <img
                src="https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury Interior"
                className="w-full h-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
