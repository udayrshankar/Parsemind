import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  isWeekend,
} from 'date-fns';

// --- Types ---

interface DayLabelProps {
  $isWeekend?: boolean;
}

interface DateCellProps {
  $isDisabled?: boolean;
  $isSelected?: boolean;
  $isToday?: boolean;
  $isWeekend?: boolean;
}

// --- Styled Components ---

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  /* Adds depth for the 3D flip */
  perspective: 1000px;
`;

const CalendarCard = styled.div`
  background: #ffffff;
  width: 380px;
  /* Fixed height prevents jitter during animation */
  height: 450px; 
  padding: 30px;
  border-radius: 16px; /* Modern, softer corners */
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 5px;
  z-index: 10; /* Ensure header stays above animating content */
`;

const MonthTitle = styled(motion.h2)`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  min-width: 140px;
  text-align: center;
`;

const NavButton = styled.button`
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #4b5563;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #111;
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px 0;
  text-align: center;
`;

const DayLabel = styled.div<DayLabelProps>`
  font-weight: 600;
  font-size: 13px;
  color: ${props => props.$isWeekend ? '#ef4444' : '#9ca3af'};
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DateCell = styled(motion.div)<DateCellProps>`
  height: 36px;
  width: 36px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50%;
  user-select: none;
  cursor: ${props => props.$isDisabled ? 'default' : 'pointer'};
  position: relative;
  
  color: ${props => {
    if (props.$isSelected) return '#fff';
    if (props.$isDisabled) return '#e5e7eb';
    if (props.$isWeekend) return '#ef4444';
    return '#374151';
  }};

  background: ${props => props.$isSelected ? '#ef4444' : 'transparent'};
  box-shadow: ${props => props.$isSelected ? '0 4px 6px -1px rgba(239, 68, 68, 0.4)' : 'none'};

  /* Today indicator dot */
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$isToday && !props.$isSelected ? '4px' : '0'};
    height: 4px;
    background-color: #ef4444;
    border-radius: 50%;
  }

  &:hover {
    background: ${props => !props.$isDisabled && !props.$isSelected ? '#fef2f2' : ''};
  }
`;

// --- Animations ---

// Optimized 3D "Card Flip" effect
const calendarVariants: Variants = {
  enter: (direction: number) => ({
    rotateX: direction > 0 ? 60 : -60,
    opacity: 0,
    y: direction > 0 ? 50 : -50, // Slight vertical movement enhances the 3D feel
    scale: 0.9,
    filter: "blur(4px)" // Motion blur effect
  }),
  center: {
    rotateX: 0,
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8
    }
  },
  exit: (direction: number) => ({
    rotateX: direction < 0 ? 60 : -60,
    opacity: 0,
    y: direction < 0 ? 50 : -50,
    scale: 0.9,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  })
};

// --- Main Component ---

const AnimatedCalendar: React.FC = () => {
  const today = new Date();
  const [currentMonthView, setCurrentMonthView] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(today);
  const [direction, setDirection] = useState(0);

  const onNextMonth = () => {
    setDirection(1);
    setCurrentMonthView(addMonths(currentMonthView, 1));
  };

  const onPrevMonth = () => {
    if (isSameMonth(currentMonthView, today)) return;
    setDirection(-1);
    setCurrentMonthView(subMonths(currentMonthView, 1));
  };

  const onDateClick = (day: Date) => {
    // Logic: Allow click if day is today or in future
    if (isSameDay(day, today) || isBefore(today, day)) {
      setSelectedDate(day);
    }
  };

  const generateDates = () => {
    const monthStart = startOfMonth(currentMonthView);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = addDays(startDate, 41); // Fixed 42-day grid

    const rows: React.ReactElement[] = [];
    let days: React.ReactElement[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isDayInCurrentMonth = isSameMonth(day, currentMonthView);
        const isToday = isSameDay(day, today);
        const isSelected = isSameDay(day, selectedDate);
        const isWeekendDay = isWeekend(day);
        const isDisabled = isBefore(day, today) && !isToday;

        days.push(
          <DateCell
            key={day.toISOString()}
            $isDisabled={isDisabled || !isDayInCurrentMonth}
            $isSelected={isSelected}
            $isToday={isToday}
            $isWeekend={isWeekendDay}
            onClick={() => onDateClick(cloneDay)}
            whileTap={!isDisabled && isDayInCurrentMonth ? { scale: 0.85 } : {}}
            layout // Helps smooth out position changes
          >
            {isDayInCurrentMonth ? format(day, "d") : ''}
          </DateCell>
        );
        day = addDays(day, 1);
      }
      rows.push(<React.Fragment key={`row-${day.toISOString()}`}>{days}</React.Fragment>);
      days = [];
    }
    return rows;
  };

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const isCurrentMonth = isSameMonth(currentMonthView, today);

  return (
    <Wrapper>
      <CalendarCard>
        <Header>
          <NavButton onClick={onPrevMonth} disabled={isCurrentMonth}>
            {/* Simple SVG Arrow */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </NavButton>
          
          <AnimatePresence mode='wait'>
            <MonthTitle
              key={format(currentMonthView, 'MM-yyyy')}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {format(currentMonthView, 'MMMM yyyy')}
            </MonthTitle>
          </AnimatePresence>

          <NavButton onClick={onNextMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </NavButton>
        </Header>

        <Grid>
          {weekDays.map((day, index) => (
            <DayLabel key={index} $isWeekend={index > 4}>
              {day}
            </DayLabel>
          ))}
        </Grid>

        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={format(currentMonthView, 'MM-yyyy')}
            custom={direction}
            variants={calendarVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px 0',
              transformStyle: "preserve-3d" // Essential for the flip effect
            }}
          >
            {generateDates()}
          </motion.div>
        </AnimatePresence>

      </CalendarCard>
    </Wrapper>
  );
};

export default AnimatedCalendar;