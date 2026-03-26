/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  gallery: string[];
  description: string;
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
  mortgage: string;
}

// --- Mock Data ---

const PROPERTIES: Property[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527359443443-84a48abc7df0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Светлая и уютная двухкомнатная квартира в современном жилом комплексе. Панорамные окна выходят на тихий двор. В квартире выполнен качественный евроремонт с использованием премиальных материалов. Развитая инфраструктура района: в шаговой доступности школы, детские сады, торговые центры и парк для прогулок. Отличная транспортная доступность.",
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
    match: 92,
    mortgage: "58 000 ₽/мес"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Просторная квартира с косметическим ремонтом. Идеально подходит для семьи. Большая кухня-гостиная, раздельный санузел. Дом 2020 года постройки с подземным паркингом.",
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
    match: 88,
    mortgage: "65 000 ₽/мес"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Квартира под ремонт в сталинском доме. Высокие потолки, толстые стены. Отличная возможность реализовать свой дизайн-проект в историческом районе.",
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
    match: 85,
    mortgage: "60 000 ₽/мес"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Элитная трехкомнатная квартира с дизайнерским ремонтом. Использованы натуральные материалы: мрамор, дуб. Система 'умный дом', кондиционирование во всех комнатах.",
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
    match: 95,
    mortgage: "72 000 ₽/мес"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Уютная квартира в тихом районе. Косметический ремонт, заменены все коммуникации. Рядом большой парк и пруд.",
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
    match: 82,
    mortgage: "52 000 ₽/мес"
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
  onToggleFavorite,
  onViewDetail
}: { 
  property: Property, 
  isMobile: boolean,
  isFavorite: boolean,
  onToggleFavorite: () => void,
  onViewDetail: () => void,
  key?: React.Key
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
        <CharacteristicRow icon={ShieldCheck} label="Средняя цена за м² в данном районе" value={property.avgDistrictPrice} />
        <CharacteristicRow 
          icon={CreditCard} 
          label="Цена за м²" 
          value={`${Math.round(property.priceValue / property.areaValue).toLocaleString('ru-RU')} ₽`} 
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-md shadow-blue-200">
          Связаться с агентом
        </button>
        <button 
          onClick={onViewDetail}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-md shadow-green-100"
        >
          Подробнее об объекте
        </button>
      </div>
    </div>
  );
};

const PropertyDetail = ({ property, onBack }: { property: Property, onBack: () => void, key?: React.Key }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold text-sm transition-colors group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
          <X size={20} />
        </div>
        Назад к сравнению
      </button>

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">
        {/* Interactive Gallery */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-8 relative h-[300px] sm:h-[500px] group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
              <img 
                src={property.gallery[activeImage]} 
                className="w-full h-full object-cover rounded-3xl" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-3xl flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-bold text-sm flex items-center gap-2">
                  <Maximize size={16} /> Смотреть все фото
                </div>
              </div>
              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold">
                {activeImage + 1} / {property.gallery.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] no-scrollbar">
              {property.gallery.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-24 h-24 lg:w-full lg:h-32 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {idx === 3 && property.gallery.length > 4 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg">
                      +{property.gallery.length - 4}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 pt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10 border-b border-gray-100 pb-10">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {property.tag}
                </span>
                <div className="flex items-center gap-1 text-gray-400 text-sm font-medium">
                  <MapPin size={14} /> {property.district}
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 mb-2">
                {property.priceLabel}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 font-bold">
                <p className="text-lg">
                  {Math.round(property.priceValue / property.areaValue).toLocaleString('ru-RU')} ₽ за м²
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3.5 sm:px-10 sm:py-5 rounded-[2rem] font-black text-sm sm:text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap">
                Связаться с агентом <ChevronRight size={18} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                  Описание объекта
                </h2>
                <div className="bg-gray-50 rounded-[2rem] p-5 sm:p-8 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-xl font-medium">
                    {property.description}
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-green-500 rounded-full" />
                  Характеристики
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[
                    { icon: Maximize, label: "Площадь", value: `${property.areaValue} м²` },
                    { icon: DoorOpen, label: "Комнаты", value: property.rooms },
                    { icon: Layers, label: "Этаж", value: property.floor },
                    { icon: Hammer, label: "Ремонт", value: property.renovation },
                    { icon: Calendar, label: "Год постройки", value: property.year },
                    { icon: Train, label: "Метро", value: property.metro },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-gray-400 mb-1.5 sm:mb-3">
                        <item.icon size={18} className="sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-0.5 sm:mb-1">{item.label}</span>
                      <span className="font-black text-sm sm:text-xl text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                <h3 className="font-black text-xl mb-6">Риелтор объекта</h3>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                    АИ
                  </div>
                  <div>
                    <p className="font-black text-lg">Александр Иванов</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-bold text-sm">Проверка документов</span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                      <ShieldCheck size={14} /> ПРОЙДЕНА
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-bold text-sm">Торг</span>
                    <span className="text-white font-black">ВОЗМОЖЕН</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-bold text-sm">Срок владения</span>
                    <span className="text-white font-black">БОЛЕЕ 5 ЛЕТ</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100">
                <h4 className="font-black text-blue-900 mb-2">Нужна ипотека?</h4>
                <p className="text-blue-700 text-sm font-medium mb-6">Поможем одобрить ставку от 12% годовых</p>
                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all">
                  Рассчитать
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center text-white">
              <span className="font-black text-xl tracking-tighter uppercase">Галерея объекта</span>
              <button onClick={() => setIsGalleryOpen(false)} className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow flex items-center justify-center p-4">
              <img 
                src={property.gallery[activeImage]} 
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 overflow-x-auto flex gap-4 no-scrollbar">
              {property.gallery.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-4 transition-all ${activeImage === idx ? 'border-blue-500 scale-110' : 'border-transparent opacity-50'}`}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const selectedProperty = PROPERTIES.find(p => p.id === selectedPropertyId);

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
        <AnimatePresence mode="wait">
          {selectedProperty ? (
            <PropertyDetail 
              key="detail"
              property={selectedProperty} 
              onBack={() => setSelectedPropertyId(null)} 
            />
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
                          onViewDetail={() => setSelectedPropertyId(prop.id)}
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
                        onViewDetail={() => setSelectedPropertyId(prop.id)}
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
            </motion.div>
          )}
        </AnimatePresence>
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
