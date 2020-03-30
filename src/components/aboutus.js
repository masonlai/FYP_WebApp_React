import React, {useContext} from "react";
import {BackgroundContext} from '../views/Indexpage'
import '../../src/assets/scss/paper-kit/cards/pageIndex.scss'


function Aboutus() {

    const theme = useContext(BackgroundContext);
    const textBLock = {
        lineHeight: '200%'
    }
    const source = {
        marginTop: '25%',
    }
    return (
        <div style={theme}>
            <div className='form'>
                <div className='container'>
                    <div className='createForm'>
                        <div style={{marginTop: '5vh'}}/>
                        <text style={textBLock}>
                            2020 is a year of change. According to the research by Worldometer (Worldometer, 2020),
                            Coronavirus from China Wuhan already cause 666037 cases which were recorded and over 30851
                            people gone.
                        </text>
                        <br/>
                        <text style={textBLock}>
                            With masks, ventilators and political goodwill in desperately short supply,
                            more than one-fifth of the world’s population was ordered or urged to stay in their homes
                            (Associated Press, 2020).
                        </text>
                        <br/>
                        <text style={textBLock}>
                            As a result, Mourning families turn to online funerals — or postpone services (sunherald.com
                            ,
                            2020).
                            I hope this online system can help these families. Human can beat the virus.
                        </text>
                        <br/>
                        <div style={source}>
                            <text style={textBLock}>
                                Source:
                            </text>
                            <br/>
                            <text style={textBLock}>
                                {'Worldometer (2020) COVID-19 CORONAVIRUS PANDEMIC. Available from: <https://www.worldometers.info/coronavirus/>[29 March 2020].'}
                            </text>
                            <br/>
                            <text style={textBLock}>
                                {'Associated Press (2020) In global fight vs. virus, over 1.5 billion told: Stay home: <https://apnews.com/d1ddda5b644a9cdd6b844a196377b88e/>[24 March 2020].'}
                            </text>
                            <br/>
                            <text style={textBLock}>
                                {'sunherald.com (2020) Mourning families turn to online funerals — or postpone services — due to coronavirus: <https://www.sunherald.com/news/coronavirus/article241469046.html/>[24 March 2020].'}
                            </text>
                            <br/>
                        </div>

                        <div style={{marginBottom: '6vh'}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;

