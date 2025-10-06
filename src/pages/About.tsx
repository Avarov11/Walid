import { Award, Heart, Target, TrendingUp } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our heart into every project, treating each space as if it were our own.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Unwavering commitment to quality and attention to detail in every element.'
    },
    {
      icon: Target,
      title: 'Vision',
      description: 'Understanding your dreams and translating them into stunning reality.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Blending timeless elegance with cutting-edge design trends and technology.'
    }
  ];

  const team = [
    {
      name: 'Sarah Williams',
      role: 'Founder & Lead Designer',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Michael Chen',
      role: 'Senior Interior Architect',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light text-black mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Crafting exceptional spaces where luxury meets livability.
          </p>
          <div className="w-24 h-px bg-amber-400 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[600px]">
            <img
              src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Luxury Interior Design"
              className="w-full h-full object-cover shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-2 border-amber-400 -z-10"></div>
          </div>
          <div>
            <h2 className="text-4xl font-light text-black mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 font-light leading-relaxed">
              <p>
                Founded in 2010, Luxe Interiors began with a simple vision: to transform ordinary spaces into extraordinary experiences. What started as a passion project has grown into one of the region's most sought-after interior design firms.
              </p>
              <p>
                With over 15 years of experience, we've had the privilege of designing hundreds of luxury residences, from intimate apartments to sprawling villas. Each project is an opportunity to push boundaries and create spaces that not only look stunning but feel like home.
              </p>
              <p>
                Our approach combines timeless elegance with contemporary flair, always tailored to reflect our clients' unique personalities and lifestyles. We believe that great design is invisible—it should enhance your life without demanding attention.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-stone-50 py-20 -mx-6 lg:-mx-12 px-6 lg:px-12 mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
                Our Philosophy
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                At the heart of everything we do are four core principles that guide our work.
              </p>
              <div className="w-24 h-px bg-amber-400 mx-auto mt-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-white hover:shadow-xl transition-shadow duration-500"
                >
                  <value.icon className="w-12 h-12 text-amber-400 mx-auto mb-6" />
                  <h3 className="text-xl font-light text-black mb-4">{value.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              A collective of talented designers dedicated to bringing your vision to life.
            </p>
            <div className="w-24 h-px bg-amber-400 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                </div>
                <h3 className="text-2xl font-light text-black mb-2">{member.name}</h3>
                <p className="text-amber-400 font-light tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative py-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative text-center">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-xl text-gray-300 font-light mb-8 max-w-2xl mx-auto">
              Whether you're starting from scratch or reimagining an existing space, we're here to make the journey seamless and inspiring.
            </p>
            <button
              onClick={() => onNavigate('reservation')}
              className="bg-amber-400 hover:bg-amber-500 text-black px-12 py-5 rounded-none font-light tracking-wider transition-all duration-300"
            >
              SCHEDULE A CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
