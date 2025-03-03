const LocationTab = (props) => {
  const handleClick = (e) => {
    props.onClick(props.name);
  };

  if (props.selectedLocation === props.name) {
    return (
      <div
        className="px-2 py-1 text-base bg-gray-200 border rounded-md cursor-pointer"
        onClick={handleClick}
      >
        {props.name}
      </div>
    );
  }

  return (
    <div
      className="px-2 py-1 text-base border rounded-md cursor-pointer"
      onClick={handleClick}
    >
      {props.name}
    </div>
  );
};

export default LocationTab;
