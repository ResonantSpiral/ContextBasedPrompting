const { useState } = React;

function EventForm() {
  const [formData, setFormData] = useState({
    name: '',
    datetime: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
    )
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
