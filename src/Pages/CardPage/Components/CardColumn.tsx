import "./CardColumn.scss";

export interface ICardColumnProps {
    children: React.ReactNode;
    name: string;
    onAddCard?: () => void;
    onDragEnter?: () => void;
    onDragLeave?: () => void;
}

export const CardColumn: React.FC<ICardColumnProps> = ({ children, name, onAddCard, onDragEnter, onDragLeave }) => {
    return <div className="card-column" onDragEnter={onDragEnter} onDragLeave={onDragLeave}>
        <div className="card-column-header">
            <h3>{name}</h3>
            <button className="add-card-button" onClick={onAddCard}>+</button>
        </div>
        {children}
    </div>
}