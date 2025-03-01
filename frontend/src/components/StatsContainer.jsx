import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';


function StatsContainer({defaultStats}) {
    const stats=[
        {
            title:'pending applications',
            count:defaultStats?.pending || 0,
            icon:<FaSuitcaseRolling/>,
            color:'#f59e0b',
            bcg:'#f3f3c7'
        },
        {
            title:'interviewed applicants',
            count:defaultStats?.interviewed || 0,
            icon:<FaCalendarCheck/>,
            color:'#647acb',
            bcg:'#e0e8f9'
        },
        {
            title:'declined applications',
            count:defaultStats?.declined || 0,
            icon:<FaBug/>,
            color:'#d66a6a',
            bcg:'#ffeeee'
        },
    ]
  return (
    <Wrapper>
        {stats.map((item)=>{
            return <StatItem key={item.title} {...item}/>
        })}
    </Wrapper>
  )
}

export default StatsContainer