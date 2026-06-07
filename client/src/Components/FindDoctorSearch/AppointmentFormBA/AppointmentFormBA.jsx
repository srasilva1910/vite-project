import React, { useState } from 'react';

const AppointmentFormBA = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM',
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedSlot) {
      alert('Please select date and time slot');
      return;
    }

    onSubmit({
      name,
      phoneNumber,
      date: selectedDate,
      slot: selectedSlot,
    });

    // reset
    setName('');
    setPhoneNumber('');
    setSelectedDate('');
    setSelectedSlot('');
  };

  const today = new Date().toISOString().split('T')[0];

  const availableSlots = timeSlots.filter((slot) => {
    // Se não escolheu data ou não é hoje,
    // mostra todos os horários
    if (selectedDate !== today) return true;

    const now = new Date();

    const slotDate = new Date();

    const [time, period] = slot.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate > now;
  });

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      {/* ✅ Fecha */}
      <div className="form-group">
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot('');
          }}
          min={today}
          required
        />
      </div>
      {/* ✅ Time slots */}
      <div className="form-group">
        <label>Select Time Slot:</label>
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">-- Select --</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-appointment-btn">
        Confirm Appointment
      </button>{' '}
    </form>
  );
};

export default AppointmentFormBA;
