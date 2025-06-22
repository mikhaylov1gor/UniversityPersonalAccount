import React, { useState } from 'react';
import './RegisterAsExternalModal.modal.scss';
import Input from "@/shared/ui/atoms/Input/Input.tsx";

interface RegisterAsExternalModalProps{
    name: string,
    eventDate: string,
}
export function RegisterAsExternalModal({ name, eventDate, onNameChange, onEventDateChange, onSearch }: RegisterAsExternalModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        handleClose();
    };

    return (
        <div>
            <button onClick={handleOpen}>Открыть модальное окно</button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={handleClose}>
                            ×
                        </button>
                        <h2>Регистрация на мероприятие</h2>
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="ФИО"
                            >
                                <label>ФИО</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ваше ФИО"
                                    required
                                />
                            </Input>
                            <div>
                                <label>Телефон</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+7 (___) ___-__-__"
                                    required
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ваш email"
                                    required
                                />
                            </div>
                            <button type="submit">Сохранить</button>
                            <button type="button" onClick={handleClose}>
                                Отменить
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalComponent;