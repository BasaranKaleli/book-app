import React from 'react'; // react kutuphanesi
import './Badge.css'; // badgeler icin stil

const Badge = ({ count }) => { // const ile badge adinda bir degisken tanimlanmis ve count sayiyor 
    // badge adinda className olusturulmus css icin badge-count da ayni sekilde 
    return ( // dondurmek 
        // && kosul saglandi mi saglanmadi mi ona bakar count 0 dan buyuk mu degil mi onu kontrol eder count sifirdan buyukse
        // count ile render edilir
        <div className="badge"> 
            {count > 0 && (
                <div className="badge-count">
                    {count}
                </div>
            )}
        </div>
    );
};

export default Badge; // disariya baska modullere sunmaya yarar bilesen veya deger baska yerlerde kullanilabilir hale gelir 