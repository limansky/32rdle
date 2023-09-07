import { Modal } from "./Modal";
import { Checkbox } from "./Checkbox";

export function SettingsDialog({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return <Modal isOpen={isOpen} onClose={onClose}>
    <div className="settings">
      <Checkbox title="Играть до конца" subtitle="Игра не закончится после 37 ходов" />
      <Checkbox title="Скрывать разгаданные доски" />
    </div>
  </Modal>;
}
