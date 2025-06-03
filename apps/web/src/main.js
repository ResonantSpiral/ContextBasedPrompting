const { useState } = React;

function EventForm() {
  const [formData, setFormData] = useState({
    name: '',
    datetime: '',
    location: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/events', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.status === 'ok') {
        setMessage('Event created successfully');
      } else {
        setMessage(data.error || 'Error creating event');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error creating event');
    }
  };

  return React.createElement(
    'form',
    { onSubmit: handleSubmit },
    React.createElement(
      'label',
      null,
      'Event Name',
      React.createElement('input', {
        name: 'name',
        value: formData.name,
        onChange: handleChange
      })
    ),
    React.createElement(
      'label',
      null,
      'Date/Time',
      React.createElement('input', {
        type: 'datetime-local',
        name: 'datetime',
        value: formData.datetime,
        onChange: handleChange
      })
    ),
    React.createElement(
      'label',
      null,
      'Location',
      React.createElement('input', {
        name: 'location',
        value: formData.location,
        onChange: handleChange
      })
    ),
    React.createElement(
      'label',
      null,
      'Description',
      React.createElement('textarea', {
        name: 'description',
        value: formData.description,
        onChange: handleChange
      })
    ),
    React.createElement(
      'button',
      { type: 'submit' },
      'Submit'
    ),
    message && React.createElement('p', null, message)
  );
}

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Event Creator'),
    React.createElement(EventForm)
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
