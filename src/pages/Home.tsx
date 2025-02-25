import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonText,
  IonIcon,
  IonBadge
} from '@ionic/react';
import { arrowDownOutline, medalOutline, trophy } from 'ionicons/icons';
import './Home.css';
import ridersData from '../data/riders.json';

const Home = () => {
  // Ordena los riders por kilometraje y obtiene los 10 primeros
  const topRiders = [...ridersData.riders]
    .sort((a, b) => b.kilometers - a.kilometers)
    .slice(0, 10);

  // Selecciona los 3 primeros
  const [first, second, third] = topRiders;

  // Obtiene el kilometraje del primer corredor
  const leaderKilometers = topRiders[0].kilometers;

  // Obtiene la posición de cada corredor
  const getPosition = (index: number) => {
    switch (index) {
      case 0:
        return <IonIcon icon={trophy} className="position-icon gold" />;
      case 1:
        return <IonIcon icon={medalOutline} className="position-icon silver" />;
      case 2:
        return <IonIcon icon={medalOutline} className="position-icon bronze" />;
      default:
        return <IonBadge className="position-number">{index + 1}</IonBadge>;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Breakaway WC 25
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="podium-wrapper">
          <div className="podium">
            <div className="podium-bar second-place">
              <div className="podium-avatar">
                <img src={second.avatar} alt={second.name} />
              </div>
              <div className="podium-kilometers">{second.kilometers}</div>
              <div className="podium-position">2nd</div>
            </div>
            <div className="podium-bar first-place">
              <div className="podium-avatar">
                <img src={first.avatar} alt={first.name} />
              </div>
              <div className="podium-kilometers">{first.kilometers}</div>
              <div className="podium-position">1st</div>
            </div>
            <div className="podium-bar third-place">
              <div className="podium-avatar">
                <img src={third.avatar} alt={third.name} />
              </div>
              <div className="podium-kilometers">{third.kilometers}</div>
              <div className="podium-position">3rd</div>
            </div>
          </div>
        </div>

        <IonText color="primary">
          <h1>Total breakaway kilometers:</h1>
        </IonText>

        <IonList>
          {topRiders.map((rider, index) => (
            <IonItem key={index} className={index === 0 ? 'first-place' : ''}>
              <IonAvatar>
                <img alt={rider.name} src={rider.avatar} />
              </IonAvatar>
              <IonLabel>
                <h3>{getPosition(index)} {`${rider.name} ${rider.flag}`}</h3>
                <p><img className="team-photo" alt={rider.team} src={rider['team-photo']} />{rider.team}</p>
              </IonLabel>
              <IonLabel slot="end">
                <span className={index === 0 ? 'leader-kilometers' : 'kilometers'}>
                  {rider.kilometers}
                </span>
                {index > 0 && (
                  <span className="difference">
                    (<IonIcon icon={arrowDownOutline} color="danger" />
                    {leaderKilometers - rider.kilometers})
                  </span>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
