import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('¡Mensaje enviado! Gracias por contactarnos.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? 
              Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📧</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@explorando.com</p>
                      <p className="text-gray-600">colaboraciones@explorando.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📱</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Teléfono</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Lunes - Viernes, 9:00 - 18:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Oficina</h3>
                      <p className="text-gray-600">
                        Av. Principal 123<br />
                        Ciudad, Estado 12345<br />
                        País
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">🌐</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Redes Sociales</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                          📘 Facebook
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                          📷 Instagram
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                          🐦 Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Envíanos un Mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="colaboracion">Colaboración</option>
                      <option value="pregunta">Pregunta General</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="publicidad">Publicidad</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full md:w-auto"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;