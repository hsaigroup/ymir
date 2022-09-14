import React, { } from "react"
import { Col, Popover, Row, Space, Tag } from "antd"
import { Link } from "umi"

import t from "@/utils/t"
import { getStageLabel } from '@/constants/project'

import s from "../detail.less"
import KeywordRates from "@/components/dataset/keywordRates"
import { TestingSet } from "./testingSet"
import { EditIcon, SearchEyeIcon, EyeOffIcon } from "@/components/common/icons"

function ProjectDetail({ project = {} }) {
  const id = project.id


  function renderProjectDatasetLabel() {
    const getDsName = (ds = {}) => ds.name ? (ds.name + ' ' + (ds.versionName || '')) : ''
    const maps = [
      { label: 'project.add.form.training.set', name: getDsName(project.trainSet) },
      { dataset: project.testSet, label: 'project.add.form.test.set', name: getDsName(project.testSet) },
      { dataset: project.miningSet, label: 'project.add.form.mining.set', name: getDsName(project.miningSet) },
    ]

    return maps.map(({ name, label, dataset }) => {
      return <Col key={label} className={s.ellipsis} span={8} title={name}>
        <span className={s.datasetTitle}>{t(label)}: </span>{dataset ? renderPop(name, dataset) : name}
      </Col>
    })
  }

  function renderPop(label, dataset = {}) {
    dataset.project = project
    const content = <KeywordRates keywords={project?.keywords} dataset={dataset} progressWidth={0.4}></KeywordRates>
    return <Popover content={content} overlayInnerStyle={{ minWidth: 500 }}>
      <Tag className={s.nameTag}>{label}</Tag>
    </Popover>
  }

  return <div className={s.detailContainer}>
    <Row>
      <Col flex={1}>
        <Space className={s.detailPanel} wrap size={16}>
          <span className={s.name}>{project.name}</span>
          <span className={s.iterationInfo}>
            {t('project.detail.info.iteration', {
              stageLabel: <span className={s.orange}>{t(getStageLabel(project.currentStage, project.round))}</span>,
              current: <span className={s.orange}>{project.round}</span>,
            })}
          </span>
          <span>{t('project.train_classes')}: <span className={s.black}>{project?.keywords?.join(',')}</span></span>
          {project.description ? <span>{t('project.detail.desc')}: {project.description}</span> : null}
        </Space>
      </Col>
      <Col>
        <Space>
          <Link to={`/home/project/${id}/iterations/settings`}><EditIcon /><span>{t('project.iteration.settings.title')}</span></Link>
          <Link to={`/home/project/${id}/iterations`}><SearchEyeIcon /><span>{t('breadcrumbs.project.iterations')}</span></Link>
        </Space>
      </Col>
    </Row>
    <div className={s.setsPanel}>
      <Row gutter={0} align='middle'>
        {renderProjectDatasetLabel()}
        <Col span={24} style={{ marginTop: 10 }}>
          <TestingSet project={project} />
        </Col>
      </Row>
    </div>
  </div>
}
export default ProjectDetail
