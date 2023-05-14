import { Table, TableBody, TableExpandRow, TableCell, TableExpandedRow } from 'carbon-components-react';
import { useState } from 'react';
import { ResearchItem } from '../services/backend';

type ItemDataTableProps = {
  item: ResearchItem;
};

export function ItemDataTable({ item }: ItemDataTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  return (
    <Table size="lg">
      <TableBody>
        {(item.visionApiResult.faceAnnotations ?? []).length > 0 && (
          <>
            <TableExpandRow
              isExpanded={!!expandedRows['Face']}
              onExpand={() => setExpandedRows(obj => ({ ...obj, Face: !obj['Face'] }))}
            >
              <TableCell>Face</TableCell>
            </TableExpandRow>
            <TableExpandedRow colSpan={2}>
              {item.visionApiResult.faceAnnotations?.map((face, faceIndex) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      gap: 4,
                      flexDirection: 'column',
                    }}
                  >
                    <h4>Face #{faceIndex}:</h4>
                    <div>Joy: {face.joyLikelihood}</div>
                    <div>Sorrow: {face.sorrowLikelihood}</div>
                    <div>Anger: {face.angerLikelihood}</div>
                    <div>Surprise: {face.surpriseLikelihood}</div>
                    <div>Exposed: {face.underExposedLikelihood}</div>
                    <div>Blurred: {face.blurredLikelihood}</div>
                    <div>Headwear: {face.headwearLikelihood}</div>
                    <div>Roll: {face.rollAngle.toFixed(2)}</div>
                    <div>Tilt: {face.tiltAngle.toFixed(2)}</div>
                    <div>Pan: {face.panAngle.toFixed(2)}</div>
                    <div>Confidence: {face.detectionConfidence.toFixed(2)}</div>
                  </div>
                );
              })}
            </TableExpandedRow>
          </>
        )}
        {(item.visionApiResult.fullTextAnnotation?.pages ?? []).length > 0 && (
          <>
            <TableExpandRow
              isExpanded={!!expandedRows['Text']}
              onExpand={() => setExpandedRows(obj => ({ ...obj, Text: !obj['Text'] }))}
            >
              <TableCell>Text</TableCell>
            </TableExpandRow>
            <TableExpandedRow colSpan={2}>
              <>
                {item.visionApiResult.fullTextAnnotation?.pages?.map((page, pageIndex) => (
                  <>
                    Page #{pageIndex} confidence is {page.confidence.toFixed(2)}
                  </>
                ))}
                <div>Full text: ${item.visionApiResult.fullTextAnnotation?.text}</div>
              </>
            </TableExpandedRow>
          </>
        )}
        {(item.visionApiResult.imagePropertiesAnnotation?.dominantColors.colors ?? []).length > 0 && (
          <>
            <TableExpandRow
              isExpanded={!!expandedRows['Color']}
              onExpand={() => setExpandedRows(obj => ({ ...obj, Color: !obj['Color'] }))}
            >
              <TableCell>Colors</TableCell>
            </TableExpandRow>
            <TableExpandedRow colSpan={2}>
              {item.visionApiResult.imagePropertiesAnnotation?.dominantColors.colors?.map(color => {
                console.log(
                  color.color,
                  `rgba(${color.color.red}, ${color.color.green}, ${color.color.blue}, ${color.color.alpha ?? 1}`,
                );
                return (
                  <div
                    title={String(color.score)}
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: `rgba(${color.color.red}, ${color.color.green}, ${color.color.blue}, ${
                        color.color.alpha ?? 1
                      }`,
                    }}
                  />
                );
              })}
            </TableExpandedRow>
          </>
        )}
        {(item.visionApiResult.labelAnnotations ?? []).length > 0 && (
          <>
            <TableExpandRow
              isExpanded={!!expandedRows['Label']}
              onExpand={() => setExpandedRows(obj => ({ ...obj, Label: !obj['Label'] }))}
            >
              <TableCell>Labels</TableCell>
            </TableExpandRow>
            <TableExpandedRow colSpan={2}>
              {item.visionApiResult.labelAnnotations?.map(label => {
                return (
                  <div>
                    {label.description}: {label.score.toFixed(2)}
                  </div>
                );
              })}
            </TableExpandedRow>
          </>
        )}
        {(item.visionApiResult.localizedObjectAnnotations ?? []).length > 0 && (
          <>
            <TableExpandRow
              isExpanded={!!expandedRows['Object']}
              onExpand={() => setExpandedRows(obj => ({ ...obj, Object: !obj['Object'] }))}
            >
              <TableCell>Objects</TableCell>
            </TableExpandRow>
            <TableExpandedRow colSpan={2}>
              {item.visionApiResult.localizedObjectAnnotations?.map(obj => {
                return (
                  <div>
                    {obj.name}: {obj.score.toFixed(2)}
                  </div>
                );
              })}
            </TableExpandedRow>
          </>
        )}
        {!!item.visionApiResult.safeSearchAnnotation && (
          <>
            <TableExpandRow
              isExpanded={!!expandedRows['Search']}
              onExpand={() => setExpandedRows(obj => ({ ...obj, Search: !obj['Search'] }))}
            >
              <TableCell>Safe search annotation</TableCell>
            </TableExpandRow>
            <TableExpandedRow colSpan={2}>
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  flexDirection: 'column',
                }}
              >
                <div>Adult: {item.visionApiResult.safeSearchAnnotation?.adult}</div>
                <div>Medical: {item.visionApiResult.safeSearchAnnotation?.medical}</div>
                <div>Racy: {item.visionApiResult.safeSearchAnnotation?.racy}</div>
                <div>Spoof: {item.visionApiResult.safeSearchAnnotation?.spoof}</div>
                <div>Violence: {item.visionApiResult.safeSearchAnnotation?.violence}</div>
              </div>
            </TableExpandedRow>
          </>
        )}
      </TableBody>
    </Table>
  );
}
