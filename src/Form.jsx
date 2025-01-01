// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import MapComponent from "./MapComponent"; // ייבוא הקומפוננטה של המפה
// import "./Form.css";

// export default function Add() {
//   const { register, handleSubmit, formState: { isValid, errors }, reset, setValue } = useForm({
//     mode: "onChange", 
//     defaultValues: {
//       status: "מחפש", 
//     },
//   });

//   const [location, setLocation] = useState({ lat: 31.257611, lon: 35.201139 }); // קואורדינטות ברירת מחדל של רחוב הדס ערד
//   const [addressSuggestions, setAddressSuggestions] = useState([]); // שדה להצעות כתובת
//   const [selectedAddress, setSelectedAddress] = useState(""); // שדה לניהול הכתובת שנבחרה

//   const handleAddressChange = async (e) => {
//     const query = e.target.value;
//     setSelectedAddress(query); // עדכון הכתובת שהמשתמש מקליד
//     if (query.length > 2) {
//       try {
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`);
//         const data = await response.json();
//         setAddressSuggestions(data); // עדכון רשימת ההצעות
//       } catch (error) {
//         console.error("Error fetching address suggestions:", error);
//       }
//     } else {
//       setAddressSuggestions([]); // אם לא מכניסים מספיק תווים, מנקה את ההצעות
//     }
//   };

//   const handleAddressSelect = (suggestion) => {
//     setSelectedAddress(suggestion.display_name); // עדכון הכתובת שנבחרה
//     setValue("address", suggestion.display_name); // עדכון הכתובת בשדה
//     setLocation({
//       lat: parseFloat(suggestion.lat),
//       lon: parseFloat(suggestion.lon),
//     });
//     setAddressSuggestions([]); // מנקה את רשימת ההצעות לאחר הבחירה
//   };

//   const save = (data) => {
//     console.log(data); // כאן תוכל להוסיף את הקוד לשמירת הנתונים
//     reset({
//       name: '',
//       address: '',
//       phone: '',
//       email: '',
//       internet: false,
//       kitchen: false,
//       coffeeMachine: false,
//       rooms: '',
//       distance: '',
//       status: 'מחפש',
//     });
//     setLocation({ lat: 31.257611, lon: 35.201139 }); // לאפס את המיקום המוגדר
//   };

//   return (
//     <div className="page-layout">
//       <form className="form-add" onSubmit={handleSubmit(save)}>
//         <input
//           {...register("name", { required: "זהו שדה חובה" })}
//           placeholder="שם משתמש"
//           type="text"
//         />
//         {errors.name && <div className="error-message">{errors.name.message}</div>}

//         <div className="address-input-wrapper">
//           <input
//             {...register("address", { required: "זהו שדה חובה" })}
//             placeholder="כתובת לחיפוש"
//             type="text"
//             onChange={handleAddressChange}
//             value={selectedAddress}
//           />
//           {errors.address && <div className="error-message">{errors.address.message}</div>}

//           {addressSuggestions.length > 0 && (
//             <div className="suggestions-dropdown">
//               {addressSuggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="suggestion-item"
//                   onClick={() => handleAddressSelect(suggestion)}
//                 >
//                   {suggestion.display_name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <input
//           {...register("phone", { required: "זהו שדה חובה", pattern: { value: /^[0-9]{10}$/, message: "הטלפון חייב להיות בן 10 ספרות" } })}
//           placeholder="טלפון"
//           type="text"
//         />
//         {errors.phone && <div className="error-message">{errors.phone.message}</div>}

//         <input
//           {...register("email", { required: "זהו שדה חובה", pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "כתובת מייל לא תקינה" } })}
//           placeholder="כתובת מייל"
//           type="email"
//         />
//         {errors.email && <div className="error-message">{errors.email.message}</div>}

//         <input
//           {...register("internet", { required: false })}
//           type="checkbox"
//         />
//         <label>האם נדרש חיבור לאינטרנט</label>

//         <input
//           {...register("kitchen", { required: false })}
//           type="checkbox"
//         />
//         <label>האם נדרש מטבח</label>

//         <input
//           {...register("coffeeMachine", { required: false })}
//           type="checkbox"
//         />
//         <label>האם נדרשת מכונת קפה</label>

//         <input
//           {...register("rooms", { required: "זהו שדה חובה", valueAsNumber: true, min: { value: 1, message: "מספר החדרים חייב להיות לפחות 1" } })}
//           placeholder="מספר חדרים"
//           type="number"
//         />
//         {errors.rooms && <div className="error-message">{errors.rooms.message}</div>}

//         <input
//           {...register("distance", { required: "זהו שדה חובה", valueAsNumber: true, min: { value: 0, message: "המרחק חייב להיות חיובי" } })}
//           placeholder="מרחק שהוא מוכן לזוז מהכתובת שהוזנה"
//           type="number"
//         />
//         {errors.distance && <div className="error-message">{errors.distance.message}</div>}

//         <input type="submit" disabled={!isValid} />
//       </form>

//       <div className="map-wrapper">
//         {/* מעביר את המיקום למפת */}
//         <MapComponent lat={location.lat} lon={location.lon} />
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MapComponent from "./MapComponent"; // ייבוא הקומפוננטה של המפה
import "./Form.css";

/**
 
 */
export default function Add() {
  // חיבור לפונקציות של React Hook Form
  const { register, handleSubmit, formState: { isValid, errors }, reset, setValue } = useForm({
    mode: "onChange", 
    defaultValues: {
      status: "מחפש", 
    },
  });

  // משתנים לניהול המיקום והכתובת
  const [location, setLocation] = useState({ lat: 31.257611, lon: 35.201139 }); // קואורדינטות ברירת מחדל של רחוב הדס ערד
  const [addressSuggestions, setAddressSuggestions] = useState([]); // שדה להצעות כתובת
  const [selectedAddress, setSelectedAddress] = useState(""); // שדה לניהול הכתובת שנבחרה

  /**
   * פונקציה להפקת המיקום הנוכחי של המשתמש אם זמין, אחרת משאירה את המיקום בברירת המחדל
   */
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude }); // עדכון המיקום הנוכחי של המשתמש
          },
          () => {
            console.error("לא ניתן להשיג את המיקום, נעבור למיקום ברירת מחדל");
            setLocation({ lat: 31.257611, lon: 35.201139 }); // אם לא הצלחנו להשיג את המיקום, נשאיר את המיקום ברירת המחדל
          }
        );
      } else {
        console.error("הדפדפן לא תומך בזיהוי מיקום");
        setLocation({ lat: 31.257611, lon: 35.201139 }); // אם אין תמיכה בזיהוי מיקום, נשאיר את המיקום ברירת המחדל
      }
    };

    getLocation(); // קריאה לפונקציה בעת טעינת הקומפוננטה
  }, []);

  /**
   * פונקציה לניהול שינוי בכתובת שהמשתמש מקליד בשדה
   * חיפוש הצעות כתובת והצגתן
   */
  const handleAddressChange = async (e) => {
    const query = e.target.value;
    setSelectedAddress(query); // עדכון הכתובת שהמשתמש מקליד
    if (query.length > 2) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`);
        const data = await response.json();
        setAddressSuggestions(data); // עדכון רשימת ההצעות
      } catch (error) {
        console.error("Error fetching address suggestions:", error); // טיפול בשגיאה במקרה של בעיה בהבאת ההצעות
      }
    } else {
      setAddressSuggestions([]); // אם לא מכניסים מספיק תווים, מנקה את ההצעות
    }
  };

  /**
   * פונקציה לניהול בחירת כתובת מתוך ההצעות
   * עדכון המיקום והכתובת שנבחרה
   */
  const handleAddressSelect = (suggestion) => {
    setSelectedAddress(suggestion.display_name); // עדכון הכתובת שנבחרה
    setValue("address", suggestion.display_name); // עדכון הכתובת בשדה
    setLocation({
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon),
    }); // עדכון המיקום לפי הקואורדינטות שנבחרו
    setAddressSuggestions([]); // מנקה את רשימת ההצעות לאחר הבחירה
  };

  /**
   * פונקציה לשמירת המידע שנמסר מהטופס
   * מאפס את כל השדות ומחזיר את המיקום לברירת המחדל
   */
  const save = (data) => {
    console.log(data); // הצגת המידע שהוזן במסוף
    reset({
      name: '',
      address: '',
      phone: '',
      email: '',
      internet: false,
      kitchen: false,
      coffeeMachine: false,
      rooms: '',
      distance: '',
      status: 'מחפש',
    }); // איפוס הטופס לערכים ברירת מחדל
    setLocation({ lat: 31.257611, lon: 35.201139 }); // לאפס את המיקום המוגדר
  };

  return (
    <div className="page-layout">
      <form className="form-add" onSubmit={handleSubmit(save)}>
        <input
           {...register("name", { required: "זהו שדה חובה" })}
           placeholder="שם משתמש"
          type="text"
        />
        {errors.name && <div className="error-message">{errors.name.message}</div>}

        <div className="address-input-wrapper">
          <input
            {...register("address", { required: "זהו שדה חובה" })}
            placeholder="כתובת לחיפוש"
            type="text"
            onChange={handleAddressChange}
            value={selectedAddress}
          />
          {errors.address && <div className="error-message">{errors.address.message}</div>}

          {addressSuggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {addressSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleAddressSelect(suggestion)}
                >
                  {suggestion.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          {...register("phone", { required: "זהו שדה חובה", pattern: { value: /^[0-9]{10}$/, message: "הטלפון חייב להיות בן 10 ספרות" } })}
          placeholder="טלפון"
          type="text"
        />
        {errors.phone && <div className="error-message">{errors.phone.message}</div>}

        <input
          {...register("email", { required: "זהו שדה חובה", pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "כתובת מייל לא תקינה" } })}
          placeholder="כתובת מייל"
          type="email"
        />
        {errors.email && <div className="error-message">{errors.email.message}</div>}

        <input
          {...register("internet", { required: false })}
          type="checkbox"
        />
        <label>האם נדרש חיבור לאינטרנט</label>

        <input
          {...register("kitchen", { required: false })}
          type="checkbox"
        />
        <label>האם נדרש מטבח</label>

        <input
          {...register("coffeeMachine", { required: false })}
          type="checkbox"
        />
        <label>האם נדרשת מכונת קפה</label>

        <input
          {...register("rooms", { required: "זהו שדה חובה", valueAsNumber: true, min: { value: 1, message: "מספר החדרים חייב להיות לפחות 1" } })}
          placeholder="מספר חדרים"
          type="number"
        />
        {errors.rooms && <div className="error-message">{errors.rooms.message}</div>}

        <input
          {...register("distance", { required: "זהו שדה חובה", valueAsNumber: true, min: { value: 0, message: "המרחק חייב להיות חיובי" } })}
          placeholder="מרחק שהוא מוכן לזוז מהכתובת שהוזנה"
          type="number"
        />
        {errors.distance && <div className="error-message">{errors.distance.message}</div>}

        <input type="submit" disabled={!isValid} />
      </form>

      <div className="map-wrapper">
        {/* מעביר את המיקום למפת */}
        <MapComponent lat={location.lat} lon={location.lon} />
      </div>
    </div>
  );
}
