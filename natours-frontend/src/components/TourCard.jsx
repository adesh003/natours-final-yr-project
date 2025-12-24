import { Link } from 'react-router-dom';
import { MapPin, Calendar, User } from 'lucide-react'; // Icons

const TourCard = ({ tour }) => {
  const imageUrl = `http://127.0.0.1:5000/img/tours/${tour.imageCover}`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">
      {/* Card Header / Image */}
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20 mix-blend-multiply z-10" />
        <img 
          src={imageUrl} 
          alt={tour.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-4 translate-y-1/2 z-20 bg-gradient-to-br from-[#7dd56f] to-[#28b487] text-white px-4 py-1 text-lg font-bold uppercase rounded-sm shadow-md">
            ${tour.price}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-700 uppercase mb-4 text-center">
          {tour.name}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#55c57a]" />
                <span>{tour.startLocation?.description}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#55c57a]" />
                <span>{new Date(tour.startDates[0]).toLocaleString('en-us', {month: 'long', year: 'numeric'})}</span>
            </div>
            <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#55c57a]" />
                <span>{tour.maxGroupSize} people</span>
            </div>
        </div>
        
        <p className="text-gray-500 text-sm italic mb-4 line-clamp-3">
            {tour.summary}
        </p>

        {/* Footer / Button */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm">
                <span className="font-bold text-gray-700">Rating {tour.ratingAverage}⭐</span> 
                {/* <span className="text-gray-400"> rating ({tour.ratingsQuantity})</span> */}
            </div>
            <Link 
                to={`/tour/${tour.id}`} 
                className="bg-[#55c57a] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#43a061] transition-colors uppercase tracking-wider"
            >
                Details
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;