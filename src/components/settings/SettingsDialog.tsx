import { Modal } from "./Modal";
import { Checkbox } from "./Checkbox";
import { useSettingsStore } from "../../app/settingsStore";

export function SettingsDialog({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

  const settings = useSettingsStore();

  return <Modal isOpen={isOpen} onClose={onClose}>
    <div className="settings">
      <Checkbox
        title="Играть до конца"
        subtitle="Игра не закончится после 37 ходов"
        value={settings.tillTheEnd}
        onChange={(x) => settings.setTillTheEnd(x)}
      />
      <Checkbox
        title="Скрывать разгаданные доски"
        value={settings.hideSolved}
        onChange={(x) => settings.setHideSolved(x)}
      />
      <Checkbox
        title="Enter справа"
        subtitle="Поменять местами Enter и Backspace"
        value={settings.enterOnTheRight}
        onChange={(x) => settings.setEnterOnTheRight(x)}
      />
    </div>
  </Modal>;
}
