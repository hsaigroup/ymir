import { useHistory } from 'umi'
import t from '@/utils/t'
import { TASKTYPES } from '@/constants/task'
import { RefreshIcon } from '@/components/common/Icons'
import { Button } from 'antd'
import { Result } from '@/constants'

type ModeType = 'menu' | 'btn'

export default function useRerunAction(mode: ModeType = 'menu') {
  const history = useHistory()

  const rerun = (pid: number, type: string, record: Result) => {
    history.push({ pathname: `/home/project/${pid}/${type}`, state: { record } })
  }

  const generateRerunAction = (record: Result) => {
    const maps: { [key: number]: string } = {
      [TASKTYPES.TRAINING]: 'train',
      [TASKTYPES.MINING]: 'mining',
      [TASKTYPES.INFERENCE]: 'inference',
    }
    const type = maps[record.taskType]
    const pid = record.projectId
    const renderMenu = type
      ? {
          key: 'rerun',
          label: t(`common.action.rerun.${type}`),
          onclick: () => rerun(pid, type, record),
          icon: <RefreshIcon />,
        }
      : { key: 'rerun', hidden: () => true }

    const renderBtn = type ? (
      <Button type="primary" onClick={() => rerun(pid, type, record)}>
        {t(`common.action.rerun.${type}`)}
      </Button>
    ) : null
    return (mode === 'btn' ? renderBtn : renderMenu) as typeof renderMenu
  }
  return generateRerunAction
}
