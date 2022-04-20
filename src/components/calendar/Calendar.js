import React from 'react';

function Calendar(props) {
    return (
        <div className={`datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-bottom ${props.showCalendar ? "datepicker-dropdown:after datepicker-orient-left:after datepicker-orient-bottom:after" : "datepicker-orient-bottom:before datepicker-orient-left:before datepicker-dropdown:before"}`}
            style={{ marginTop: "50px", marginLeft: "11.5px", display: "block" }}>
            <div className="datepicker-days" style={{ display: `${props.showDaysCalendar === true ? "block" : "none"}` }}>
                <table className=" table-condensed">
                    <thead>
                        <tr>
                            <th colSpan="7" className="datepicker-title" style={{ display: "none" }}>
                            </th>
                        </tr>
                        <tr>
                            <th className="prev" style={{ visibility: "visible" }}>«</th>
                            <th colSpan="5" className="datepicker-switch" onClick={props.showMonthOnclick}>April 2022</th>
                            <th className="next" style={{ visibility: "visible" }} onClick={() => alert('forward button pressed')}>»</th>
                        </tr>
                        <tr>
                            <th className="dow">Su</th>
                            <th className="dow">Mo</th>
                            <th className="dow">Tu</th>
                            <th className="dow">We</th>
                            <th className="dow">Th</th>
                            <th className="dow">Fr</th>
                            <th className="dow">Sa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="old day">27</td>
                            <td className="old day">28</td>
                            <td className="old day">29</td>
                            <td className="old day">30</td>
                            <td className="old day">31</td>
                            <td className={props.date === 1 ? "today day" : "day"}>1</td>
                            <td className={props.date === 2 ? "today day" : "day"}>2</td>
                        </tr>
                        <tr>
                            <td className={props.date === 3 ? "today day" : "day"}>3</td>
                            <td className={props.date === 4 ? "today day" : "day"}>4</td>
                            <td className={props.date === 5 ? "today day" : "day"}>5</td>
                            <td className={props.date === 6 ? "today day" : "day"}>6</td>
                            <td className={props.date === 7 ? "today day" : "day"}>7</td>
                            <td className={props.date === 8 ? "today day" : "day"}>8</td>
                            <td className={props.date === 9 ? "today day" : "day"}>9</td>
                        </tr>
                        <tr>
                            <td className={props.date === 10 ? "today day" : "day"}>10</td>
                            <td className={props.date === 11 ? "today day" : "day"}>11</td>
                            <td className={props.date === 12 ? "today day" : "day"}>12</td>
                            <td className={props.date === 13 ? "today day" : "day"}>13</td>
                            <td className={props.date === 14 ? "today day" : "day"}>14</td>
                            <td className={props.date === 15 ? "today day" : "day"}>15</td>
                            <td className={props.date === 16 ? "today day" : "day"}>16</td>
                        </tr>
                        <tr>
                            <td className={props.date === 17 ? "today day" : "day"}>17</td>
                            <td className={props.date === 18 ? "today day" : "day"}>18</td>
                            <td className={props.date === 19 ? "today day" : "day"}>19</td>
                            <td className={props.date === 20 ? "today day" : "day"} onClick={props.selectDay}>20</td>
                            <td className={props.date === 21 ? "today day" : "day"}>21</td>
                            <td className={props.date === 22 ? "today day" : "day"}>22</td>
                            <td className={props.date === 23 ? "today day" : "day"}>23</td>
                        </tr>
                        <tr>
                            <td className={props.date === 24 ? "today day" : "day"}>24</td>
                            <td className={props.date === 25 ? "today day" : "day"}>25</td>
                            <td className={props.date === 26 ? "today day" : "day"}>26</td>
                            <td className={props.date === 27 ? "today day" : "day"}>27</td>
                            <td className={props.date === 28 ? "today day" : "day"}>28</td>
                            <td className={props.date === 29 ? "today day" : "day"}>29</td>
                            <td className={props.date === 30 ? "today day" : "day"}>30</td>
                        </tr>
                        <tr>
                            <td className="new day">1</td>
                            <td className="new day">2</td>
                            <td className="new day">3</td>
                            <td className="new day">4</td>
                            <td className="new day">5</td>
                            <td className="new day">6</td>
                            <td className="new day">7</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
                        </tr>
                        <tr>
                            <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="datepicker-months" style={{ display: `${props.showMonthCalendar === true ? "block" : "none"}` }}>
                <table className="table-condensed">
                    <thead>
                        <tr>
                            <th colSpan="7" className="datepicker-title" style={{ display: "none" }}></th>
                        </tr>
                        <tr>
                            <th className="prev" style={{ visibility: "visible" }}>«</th>
                            <th colSpan="5" className="datepicker-switch" onClick={props.showYear}>2022</th>
                            <th className="next" style={{ visibility: "visible" }}>»</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <span className={props.month === 1 ? "month focused" : "month"}>Jan</span>
                                <span className={props.month === 2 ? "month focused" : "month"}>Feb</span>
                                <span className={props.month === 3 ? "month focused" : "month"}>Mar</span>
                                <span className={props.month === 4 ? "month focused" : "month"} onClick={props.selectMonth}>Apr</span>
                                <span className={props.month === 5 ? "month focused" : "month"}>May</span>
                                <span className={props.month === 6 ? "month focused" : "month"}>Jun</span>
                                <span className={props.month === 7 ? "month focused" : "month"}>Jul</span>
                                <span className={props.month === 8 ? "month focused" : "month"}>Aug</span>
                                <span className={props.month === 9 ? "month focused" : "month"}>Sep</span>
                                <span className={props.month === 10 ? "month focused" : "month"}>Oct</span>
                                <span className={props.month === 11 ? "month focused" : "month"}>Nov</span>
                                <span className={props.month === 12 ? "month focused" : "month"}>Dec</span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
                        </tr>
                        <tr>
                            <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="datepicker-years" style={{ display: `${props.showYearOptionCalendar === true ? "block" : "none"}` }}>
                <table className="table-condensed">
                    <thead>
                        <tr>
                            <th colSpan="7" className="datepicker-title" style={{display: "none"}}></th>
                        </tr>
                        <tr>
                            <th className="prev" style={{ visibility: "visible" }}>«</th>
                            <th colSpan="5" className="datepicker-switch" onClick={props.showDecadesOptionCalendar}>2020-2029</th>
                            <th className="next" style={{ visibility: "visible" }}>»</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <span className="year old">2019</span>
                                <span className="year">2020</span>
                                <span className="year">2021</span>
                                <span className={props.year === 2022 ? "year focused" : "year"} onClick={props.selectYear}>2022</span>
                                <span className={props.year === 2023 ? "year focused" : "year"}>2023</span>
                                <span className={props.year === 2024 ? "year focused" : "year"}>2024</span>
                                <span className={props.year === 2025 ? "year focused" : "year"}>2025</span>
                                <span className={props.year === 2026 ? "year focused" : "year"}>2026</span>
                                <span className={props.year === 2027 ? "year focused" : "year"}>2027</span>
                                <span className={props.year === 2028 ? "year focused" : "year"}>2028</span>
                                <span className={props.year === 2029 ? "year focused" : "year"}>2029</span>
                                <span className="year new">2030</span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
                        </tr>
                        <tr>
                            <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="datepicker-decades" style={{ display: `${props.showDecadeCalendar === true ? "block" : "none"}` }}>
                <table className="table-condensed">
                    <thead>
                        <tr>
                            <th colSpan="7" className="datepicker-title" style={{ display: "none" }}></th>
                        </tr>
                        <tr>
                            <th className="prev" style={{ visibility: "visible" }}>«</th>
                            <th colSpan="5" className="datepicker-switch" onClick={props.showCenturiesOptionCalendar}>2000-2090</th>
                            <th className="next" style={{ visibility: "visible" }}>»</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <span className="decade old">1990</span>
                                <span className="decade">2000</span>
                                <span className="decade">2010</span>
                                <span className="decade focused" onClick={props.selectDecade}>2020</span>
                                <span className="decade">2030</span>
                                <span className="decade">2040</span>
                                <span className="decade">2050</span>
                                <span className="decade">2060</span>
                                <span className="decade">2070</span>
                                <span className="decade">2080</span>
                                <span className="decade">2090</span>
                                <span className="decade new">2100</span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
                        </tr>
                        <tr>
                            <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="datepicker-centuries" style={{ display: `${props.showCenturiesCalendar === true ? "block" : "none"}` }}>
                <table className="table-condensed">
                    <thead>
                        <tr>
                            <th colSpan="7" className="datepicker-title" style={{ display: "none" }}></th>
                        </tr>
                        <tr>
                            <th className="prev" style={{ visibility: "visible" }}>«</th>
                            <th colSpan="5" className="datepicker-switch">2000-2900</th>
                            <th className="next" style={{ visibility: "visible" }}>»</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <span className="century old">1900</span>
                                <span className="century" onClick={props.selectCentury}>2000</span>
                                <span className="century">2100</span>
                                <span className="century">2200</span>
                                <span className="century">2300</span>
                                <span className="century">2400</span>
                                <span className="century">2500</span>
                                <span className="century">2600</span>
                                <span className="century">2700</span>
                                <span className="century">2800</span>
                                <span className="century">2900</span>
                                <span className="century new">3000</span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
                        </tr>
                        <tr>
                            <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Calendar;