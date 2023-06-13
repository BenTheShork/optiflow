import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Version } from '@src/app/share/classes/version.class';
import { AlertService } from '@src/app/share/services/alert.service';
import { VersionApiService } from '@src/app/share/services/api/version-api.service';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.development.js';
import { Observable, Subject, Subscription, catchError, from, map, switchMap, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-bpmn-modeler',
  templateUrl: './bpmn-modeler.component.html',
  styleUrls: ['./bpmn-modeler.component.scss']
})
export class BpmnModelerComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  @ViewChild('ref', { static: true }) private el: ElementRef;

  diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
  importError?: Error;

  public version$ = new Observable<Version>();
  public versionId: string;

  private temp: Version;
  private bpmnJS= new BpmnJS();
  private unsubscribe$ = new Subject<void>();

  file = `<?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" targetNamespace="" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd">
    <collaboration id="sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424">
      <participant id="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F" name="Sample stage" processRef="sid-C3803939-0872-457F-8336-EAE484DC4A04" />
    </collaboration>
    <process id="sid-C3803939-0872-457F-8336-EAE484DC4A04" name="Customer" processType="None" isClosed="false" isExecutable="false">
      <extensionElements />
      <laneSet id="sid-b167d0d7-e761-4636-9200-76b7f0e8e83a">
        <lane id="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254">
          <flowNodeRef>Event_0f6evzq</flowNodeRef>
          <flowNodeRef>Activity_04g20em</flowNodeRef>
          <flowNodeRef>Event_0t4jbek</flowNodeRef>
        </lane>
      </laneSet>
      <startEvent id="Event_0f6evzq">
        <outgoing>Flow_1k8skgb</outgoing>
      </startEvent>
      <task id="Activity_04g20em" name="Sample task">
        <incoming>Flow_1k8skgb</incoming>
        <outgoing>Flow_1ktrtjo</outgoing>
      </task>
      <sequenceFlow id="Flow_1k8skgb" sourceRef="Event_0f6evzq" targetRef="Activity_04g20em" />
      <endEvent id="Event_0t4jbek">
        <incoming>Flow_1ktrtjo</incoming>
      </endEvent>
      <sequenceFlow id="Flow_1ktrtjo" sourceRef="Activity_04g20em" targetRef="Event_0t4jbek" />
    </process>
    <bpmndi:BPMNDiagram id="sid-74620812-92c4-44e5-949c-aa47393d3830">
      <bpmndi:BPMNPlane id="sid-cdcae759-2af7-4a6d-bd02-53f3352a731d" bpmnElement="sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424">
        <bpmndi:BPMNShape id="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F_gui" bpmnElement="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F" isHorizontal="true">
          <omgdc:Bounds x="83" y="105" width="933" height="250" />
          <bpmndi:BPMNLabel labelStyle="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
            <omgdc:Bounds x="47.49999999999999" y="170.42857360839844" width="12.000000000000014" height="59.142852783203125" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254_gui" bpmnElement="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254" isHorizontal="true">
          <omgdc:Bounds x="113" y="105" width="903" height="250" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Event_0f6evzq_di" bpmnElement="Event_0f6evzq">
          <omgdc:Bounds x="172" y="212" width="36" height="36" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_04g20em_di" bpmnElement="Activity_04g20em">
          <omgdc:Bounds x="260" y="190" width="100" height="80" />
          <bpmndi:BPMNLabel />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Event_0t4jbek_di" bpmnElement="Event_0t4jbek">
          <omgdc:Bounds x="412" y="212" width="36" height="36" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="Flow_1k8skgb_di" bpmnElement="Flow_1k8skgb">
          <omgdi:waypoint x="208" y="230" />
          <omgdi:waypoint x="260" y="230" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1ktrtjo_di" bpmnElement="Flow_1ktrtjo">
          <omgdi:waypoint x="360" y="230" />
          <omgdi:waypoint x="412" y="230" />
        </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
      <bpmndi:BPMNLabelStyle id="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
        <omgdc:Font name="Arial" size="11" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" />
      </bpmndi:BPMNLabelStyle>
      <bpmndi:BPMNLabelStyle id="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
        <omgdc:Font name="Arial" size="12" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" />
      </bpmndi:BPMNLabelStyle>
    </bpmndi:BPMNDiagram>
  </definitions>`;

  constructor(
    private route: ActivatedRoute,
    private versionApiService: VersionApiService,
    private alertService: AlertService,
    private http: HttpClient
  ) {
    this.versionId = this.route.snapshot.queryParamMap.get('versionId');
  }

  handleImported(event: any) {

    const {
      type,
      error,
      warnings
    } = event;

    if (type === 'success') {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }

    if (type === 'error') {
      console.error('Failed to render diagram', error);
    }

    this.importError = error;
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngOnInit(): void {
    if (this.versionId) {
      this.version$ = this.versionApiService.getVersion(this.versionId);
      this.version$.subscribe(version => {
        this.temp = version;
        if (version.file) {
          this.file = version.file;
        } else {
        }
        this.loadUrl(this.file);
        this.bpmnJS.on('import.done', ({ error }: { error?: Error })=> {
          if (!error) {
            this.bpmnJS.get('canvas').zoom('fit-viewport');
          }
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    if (changes.url) {
      this.loadUrl(changes.url.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string): void {
    this.bpmnJS.importXML(url);
  }

  exportDiagram(): void {
    this.bpmnJS.saveXML({ format: true }).then((result: any) => {
      this.temp.file = result.xml;
      this.versionApiService.patchVersion(this.temp.id, this.temp).pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.alertService.success('alerts.successful-update')),
        catchError((error) => {
          this.alertService.error('request-errors.cannot-delete', error);
            return throwError(error);
        })
    ).subscribe();
    }).catch((err: any) => {
      console.error('Could not save BPMN 2.0 diagram', err);
    });
  }

  /**
   * Creates a Promise to import the given XML into the current
   * BpmnJS instance, then returns it as an Observable.
   *
   * @see https://github.com/bpmn-io/bpmn-js-callbacks-to-promises#importxml
   */
  private importDiagram(xml: string): Observable<{warnings: Array<any>}> {
    return from(this.bpmnJS.importXML(xml) as Promise<{warnings: Array<any>}>);
  }
}
