-- Categories table (you already have this)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attributes table - defines what attributes each category can have
CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- e.g., 'transmission', 'fuel', 'engine'
    label VARCHAR(100) NOT NULL, -- e.g., 'Transmission', 'Fuel Type', 'Engine Size'
    input_type VARCHAR(20) DEFAULT 'select', -- 'select', 'text', 'number'
    is_required BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(category_id, name)
);

-- Attribute options table - defines the possible values for each attribute
CREATE TABLE attribute_options (
    id SERIAL PRIMARY KEY,
    attribute_id INTEGER NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    value VARCHAR(100) NOT NULL, -- e.g., 'automatic', 'manual', 'gasoline'
    label VARCHAR(100) NOT NULL, -- e.g., 'Automatic', 'Manual', 'Gasoline'
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(attribute_id, value)
);

-- Sample data for categories (assuming you already have some)
INSERT INTO categories (name) VALUES
('sedan'),
('suv'),
('hatchback'),
('coupe'),
('motorcycle'),
('truck');

-- Sample attributes for sedan category (category_id = 1)
INSERT INTO attributes (category_id, name, label, is_required, sort_order) VALUES
(1, 'transmission', 'Transmission', true, 1),
(1, 'fuel', 'Fuel Type', true, 2),
(1, 'doors', 'Doors', true, 3),
(1, 'seats', 'Seats', true, 4);

-- Sample attributes for SUV category (category_id = 2)
INSERT INTO attributes (category_id, name, label, is_required, sort_order) VALUES
(2, 'transmission', 'Transmission', true, 1),
(2, 'fuel', 'Fuel Type', true, 2),
(2, 'drivetrain', 'Drivetrain', true, 3),
(2, 'seats', 'Seats', true, 4);

-- Sample attributes for motorcycle category (category_id = 5)
INSERT INTO attributes (category_id, name, label, is_required, sort_order) VALUES
(5, 'engine', 'Engine Size', true, 1),
(5, 'fuel', 'Fuel Type', true, 2),
(5, 'type', 'Type', true, 3);

-- Attribute options for transmission (attribute_id will be 1 for sedan, 5 for SUV)
INSERT INTO attribute_options (attribute_id, value, label, sort_order) VALUES
-- Sedan transmission options
(1, 'automatic', 'Automatic', 1),
(1, 'manual', 'Manual', 2),
-- SUV transmission options  
(5, 'automatic', 'Automatic', 1),
(5, 'manual', 'Manual', 2);

-- Attribute options for fuel type
INSERT INTO attribute_options (attribute_id, value, label, sort_order) VALUES
-- Sedan fuel options (attribute_id = 2)
(2, 'gasoline', 'Gasoline', 1),
(2, 'hybrid', 'Hybrid', 2),
(2, 'electric', 'Electric', 3),
-- SUV fuel options (attribute_id = 6)
(6, 'gasoline', 'Gasoline', 1),
(6, 'hybrid', 'Hybrid', 2),
(6, 'electric', 'Electric', 3),
(6, 'diesel', 'Diesel', 4),
-- Motorcycle fuel options (attribute_id = 9)
(9, 'gasoline', 'Gasoline', 1),
(9, 'electric', 'Electric', 2);

-- Attribute options for doors (sedan only)
INSERT INTO attribute_options (attribute_id, value, label, sort_order) VALUES
(3, '2', '2 Doors', 1),
(3, '4', '4 Doors', 2);

-- Attribute options for seats
INSERT INTO attribute_options (attribute_id, value, label, sort_order) VALUES
-- Sedan seats (attribute_id = 4)
(4, '2', '2 Seats', 1),
(4, '4', '4 Seats', 2),
(4, '5', '5 Seats', 3),
-- SUV seats (attribute_id = 8)
(8, '5', '5 Seats', 1),
(8, '7', '7 Seats', 2),
(8, '8', '8 Seats', 3);

-- Attribute options for SUV drivetrain
INSERT INTO attribute_options (attribute_id, value, label, sort_order) VALUES
(7, 'fwd', 'FWD', 1),
(7, 'awd', 'AWD', 2),
(7, '4wd', '4WD', 3);

-- Attribute options for motorcycle engine
INSERT INTO attribute_options (attribute_id, value, label, sort_order) VALUES
(8, '125cc', '125cc', 1),
(8, '250cc', '250cc', 2),
(8, '400cc', '400cc', 3),
(8, '600cc', '600cc', 4),
(8, '750cc', '750cc', 5),
(8, '1000cc+', '1000cc+', 6);

-- Attribute options for motorcycle type
INSERT INTO attribute_options (attribute_id, value, label, sort_order) VALUES
(10, 'sport', 'Sport', 1),
(10, 'cruiser', 'Cruiser', 2),
(10, 'touring', 'Touring', 3),
(10, 'adventure', 'Adventure', 4),
(10, 'scooter', 'Scooter', 5);

-- Create indexes for better performance
CREATE INDEX idx_attributes_category_id ON attributes(category_id);
CREATE INDEX idx_attribute_options_attribute_id ON attribute_options(attribute_id);
