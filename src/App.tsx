/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Train, 
  Maximize, 
  Layers, 
  DoorOpen, 
  Hammer, 
  Calendar, 
  Car, 
  Handshake, 
  ShieldCheck, 
  CreditCard,
  ChevronRight,
  X,
  Search,
  Menu,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Property {
  id: number;
  image: string;
  priceLabel: string;
  priceValue: number;
  tag: string;
  district: string;
  metro: string;
  areaValue: number;
  floor: string;
  rooms: number;
  renovation: string;
  year: number;
  avgDistrictPrice: string;
  match: number;
}

// --- Mock Data ---

const PROPERTIES: Property[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    priceLabel: "12.5 млн",
    priceValue: 12500000,
    tag: "Ниже рынка",
    district: "Нагорный",
    metro: "Нагорная, 5 мин",
    areaValue: 54,
    floor: "7/12",
    rooms: 2,
    renovation: "Евро",
    year: 2018,
    avgDistrictPrice: "245 000 ₽",
    match: 92
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
    priceLabel: "14.1 млн",
    priceValue: 14100000,
    tag: "Ниже рынка",
    district: "Нагорный",
    metro: "Нагорная, 7 мин",
    areaValue: 62,
    floor: "9/16",
    rooms: 2,
    renovation: "Косметический",
    year: 2020,
    avgDistrictPrice: "245 000 ₽",
    match: 88
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
    priceLabel: "13.8 млн",
    priceValue: 13800000,
    tag: "Ниже рынка",
    district: "Крымская",
    metro: "Крымская, 10 мин",
    areaValue: 58,
    floor: "4/9",
    rooms: 2,
    renovation: "Требует ремонта",
    year: 2015,
    avgDistrictPrice: "238 000 ₽",
    match: 85
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    priceLabel: "15.2 млн",
    priceValue: 15200000,
    tag: "Рыночная",
    district: "Академический",
    metro: "Профсоюзная, 12 мин",
    areaValue: 65,
    floor: "12/24",
    rooms: 3,
    renovation: "Дизайнерский",
    year: 2022,
    avgDistrictPrice: "260 000 ₽",
    match: 95
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
    priceLabel: "11.9 млн",
    priceValue: 11900000,
    tag: "Ниже рынка",
    district: "Зюзино",
    metro: "Зюзино, 8 мин",
    areaValue: 50,
    floor: "3/5",
    rooms: 2,
    renovation: "Косметический",
    year: 1975,
    avgDistrictPrice: "215 000 ₽",
    match: 82
  }
];

// --- Components ---

const CharacteristicRow = ({ icon: Icon, label, value, isHighlighted = false }: { icon: any, label: string, value: string | number, isHighlighted?: boolean }) => (
  <div className={`flex items-center gap-3 py-3 px-4 border-b border-gray-100 last:border-0 ${isHighlighted ? 'bg-green-50' : ''}`}>
    <div className="text-gray-400">
      <Icon size={18} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{label}</span>
      <span className={`text-sm font-medium ${isHighlighted ? 'text-green-700' : 'text-gray-900'}`}>{value}</span>
    </div>
  </div>
);

const PropertyCard = ({ 
  property, 
  isMobile, 
  isFavorite, 
  onToggleFavorite 
}: { 
  property: Property, 
  isMobile: boolean,
  isFavorite: boolean,
  onToggleFavorite: () => void
}) => {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col ${isMobile ? 'min-w-[280px] w-[280px]' : 'w-full'}`}>
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden group">
        <img 
          src={property.image} 
          alt={property.district} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
            {property.priceLabel}
          </span>
          <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide shadow-sm">
            {property.tag}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`backdrop-blur-md p-1.5 rounded-full transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 hover:bg-white/40 text-white'}`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-1.5 rounded-full text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center justify-between shadow-sm">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Соответствие</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-600">{property.match}%</span>
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${property.match}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Characteristics Section */}
      <div className="flex flex-col flex-grow">
        <CharacteristicRow icon={MapPin} label="Район / Метро" value={`${property.district} / ${property.metro}`} />
        <CharacteristicRow icon={Maximize} label="Площадь" value={`${property.areaValue} м²`} />
        <CharacteristicRow icon={Layers} label="Этаж" value={property.floor} />
        <CharacteristicRow icon={DoorOpen} label="Комнаты" value={property.rooms} />
        <CharacteristicRow icon={Hammer} label="Ремонт / Год" value={`${property.renovation} / ${property.year}`} />
        <CharacteristicRow icon={ShieldCheck} label="Средняя цена за квадратный метр в данном районе" value={property.avgDistrictPrice} />
        <CharacteristicRow 
          icon={CreditCard} 
          label="Цена за квадратный метр" 
          value={`${Math.round(property.priceValue / property.areaValue).toLocaleString('ru-RU')} ₽`} 
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-md shadow-blue-200">
          Связаться с агентом
        </button>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-md shadow-green-100">
          Подробнее об объекте
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const displayedProperties = viewMode === 'favorites' 
    ? PROPERTIES.filter(p => favorites.includes(p.id)) 
    : PROPERTIES;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic">
              B
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">БЕЗАГЕНТА</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Купить</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Снять</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Продать</a>
              <a href="#" className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">Сравнение</a>
            </nav>
            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <Search size={20} className="text-gray-600" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-blue-700 transition-all">
              Войти
            </button>
          </div>

          <button className="md:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        {/* Title & Filter Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <span className="bg-red-100 text-red-600 p-1 rounded">🎯</span>
              Двушка, ЮАО, 50-65м², 12-14 млн
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
              Сравнение объектов
            </h1>
          </div>

          <div className="flex items-center p-1 bg-gray-200/50 rounded-xl w-fit self-center sm:self-start">
            <button 
              onClick={() => setViewMode('all')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Все параметры
            </button>
            <button 
              onClick={() => setViewMode('favorites')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'favorites' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Heart size={16} fill={viewMode === 'favorites' ? "currentColor" : "none"} />
              Избранные объекты
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="relative">
          {isMobile ? (
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
              {displayedProperties.map((prop) => (
                <div key={prop.id} className="snap-center">
                  <PropertyCard 
                    property={prop} 
                    isMobile={true} 
                    isFavorite={favorites.includes(prop.id)}
                    onToggleFavorite={() => toggleFavorite(prop.id)}
                  />
                </div>
              ))}
              {/* Add a placeholder card to show there's more */}
              {displayedProperties.length > 0 && (
                <div className="min-w-[100px] flex items-center justify-center">
                   <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-blue-600">
                      <ChevronRight />
                   </button>
                </div>
              )}
              {displayedProperties.length === 0 && (
                <div className="w-full py-20 text-center text-gray-400 font-medium">
                  Список избранного пуст
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {displayedProperties.map((prop) => (
                <PropertyCard 
                  key={prop.id} 
                  property={prop} 
                  isMobile={false} 
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={() => toggleFavorite(prop.id)}
                />
              ))}
              {displayedProperties.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-400 font-medium bg-white rounded-3xl border border-dashed border-gray-300">
                  Список избранного пуст
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Юридическая проверка</h3>
                <p className="text-sm text-gray-500">Все объекты прошли базовую проверку документов</p>
              </div>
            </div>
            <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
              Подробнее о проверке <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <Search size={20} />
            <span className="text-[10px] font-bold uppercase">Поиск</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Layers size={20} />
            <span className="text-[10px] font-bold uppercase">Объекты</span>
          </button>
          <div className="bg-blue-600 p-3 rounded-full -mt-10 shadow-lg shadow-blue-200 border-4 border-[#F8F9FB]">
            <Search size={24} className="text-white" />
          </div>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Handshake size={20} />
            <span className="text-[10px] font-bold uppercase">Сделки</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <ShieldCheck size={20} />
            <span className="text-[10px] font-bold uppercase">Профиль</span>
          </button>
        </div>
      )}
    </div>
  );
}
